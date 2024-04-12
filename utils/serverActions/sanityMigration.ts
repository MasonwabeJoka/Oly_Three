// Use the server-side environment for executing this script.
"use server";

// Import the 'client' object from a client library file. This object allows us to interact with the database.
import { client } from '@/lib/client';

// Define a TypeScript type for our documents, specifying the structure of data.
type Doc = {
  _id: string;                // Unique identifier for each document.
  _rev?: string;              // Optional: Revision ID for version tracking.
  _type: string;              // Type of the document, e.g., 'category'.
  incomingReferences?: Doc[]; // Optional: Array of other documents referencing this one.
};

const OLD_TYPE = 'category';          // Current type of the documents to be migrated.
const NEW_TYPE = 'category_archive';  // New type to assign to migrated documents.

// Fetch documents of OLD_TYPE that haven't been migrated yet, in batches of 10.
export const fetchDocuments = () =>
  client.fetch(
    `*[_type == $category && !(_id in path("drafts.**") || _id match "*migrated")][0...10] {...}`,
    { category: OLD_TYPE }
  );

  async function updateOrRemoveReferences(docId, mutations) {
    // Fetch all documents that reference the document with `docId`
    const query = `*[_type in ['category', 'user'] && (references($docId) || 
                  parentCategory._ref == $docId || 
                  childCategory._ref == $docId ||
                  createdBy._ref == $docId ||
                  relatedCategories[]._ref == $docId)]`;
    const referencingDocs = await client.fetch(query, { docId });
  
    for (const refDoc of referencingDocs) {
      // Construct a patch object to unset or update each reference field.
      let patch = {};
  
      if (refDoc.parentCategory?._ref === docId) {
        patch['parentCategory'] = null; // Unsetting the parentCategory if it references docId
      }
      if (refDoc.childCategory?._ref === docId) {
        patch['childCategory'] = null; // Unsetting the childCategory if it references docId
      }
      if (refDoc.createdBy?._ref === docId) {
        patch['createdBy'] = null; // Unsetting the createdBy if it references docId
      }
      if (refDoc.relatedCategories?.some(cat => cat._ref === docId)) {
        // Filtering out the references to docId from relatedCategories array
        patch['relatedCategories'] = refDoc.relatedCategories.filter(cat => cat._ref !== docId);
      }
  
      // If the patch object is not empty, push the patch mutation to the mutations array
      if (Object.keys(patch).length > 0) {
        mutations.push({
          id: refDoc._id,
          patch: { set: patch }
        });
      }
    }
  }
  

// Build a list of mutations to apply to these documents for migration.
const buildMutations = async (docs: Doc[]) => {
  const mutations: any = []; // Start with an empty list for storing mutations.

  for (const doc of docs) {
    console.log('Document to migrate', doc._id); // Log the ID of the document.

    const newDocId = `${doc._id}migrated`;
    const newDocument = { ...doc, _id: newDocId, _type: NEW_TYPE };

    mutations.push({ create: newDocument }); // Add a mutation to create the new document.

    // Handle existing references before deleting the document.
    await updateOrRemoveReferences(doc._id, mutations);

    mutations.push({ delete: doc._id }); // Add a mutation to delete the old document.
  }

  console.log("Mutations built successfully");
  return mutations.filter(Boolean); // Return the list of valid mutations.
};

// Create and execute a database transaction with the built mutations.
const createTransaction = (mutations: any) => {
  return mutations.reduce((tx: any, mutation: any) => {
    if (mutation.delete) {
      return tx.delete(mutation.delete); // Apply delete mutation.
    }
    if (mutation.create) {
      return tx.createIfNotExists(mutation.create); // Apply create mutation.
    }
    if (mutation.patch) {
      return tx.patch(mutation.id, mutation.patch); // Apply patch mutation.
    }
  }, client.transaction()); // Begin with a new transaction.
};

// Asynchronously process the migration in batches.
const migrateNextBatch: any = async () => {
  try {
    const documents = await fetchDocuments();
    console.log(`Fetched ${documents.length} documents`);
    if (documents.length === 0) {
      console.log('No more documents to migrate!');
      return null;
    }

    const mutations = await buildMutations(documents);
    console.log("Executing transaction with mutations");
    const transaction = createTransaction(mutations);
    await transaction.commit();
    console.log("Transaction committed successfully");

    return migrateNextBatch();
  } catch (error) {
    console.error("Error in migration process:", error);
    throw error; // Rethrow the error to be caught by the catch block outside.
  }
};

// // Start the migration process and handle any potential errors.
// migrateNextBatch().catch((err: any) => {
//   console.error(JSON.stringify(err, null, 2)); // Log errors that occur.
//   process.exit(1); // Exit with an error code in case of an error.
// });







