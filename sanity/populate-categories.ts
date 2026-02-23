import { client } from "@/sanity/lib/client"
import {categoryData} from "@/data/categoryData"


interface CategoryItem {
  path: string
  title: string
  level: number
  parentPath?: string
  slug: string
}

function parseCategories(data: string): CategoryItem[] {
  const lines = data.trim().split("\n")
  const categories: CategoryItem[] = []

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]
    const [path, title] = line.split("\t")
    if (!path) continue

    const pathParts = path.split("/")
    const level = pathParts.length - 1
    const parentPath = level > 0 ? pathParts.slice(0, -1).join("/") : undefined

    const displayTitle = title?.trim() || pathParts[pathParts.length - 1]

    const slug = path
      .toLowerCase()
      .replace(/\//g, "-") // Replace forward slashes with hyphens
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/&/g, "and") // Replace & with "and"
      .replace(/[^a-z0-9-]+/g, "") // Remove all non-alphanumeric characters except hyphens
      .replace(/-+/g, "-") // Replace multiple consecutive hyphens with single hyphen
      .replace(/^-|-$/g, "") // Remove leading/trailing hyphens

    categories.push({
      path,
      title: displayTitle,
      level,
      parentPath,
      slug,
    })
  }

  return categories.sort((a, b) => a.level - b.level || a.path.localeCompare(b.path))
}

export async function populateCategories() {
  console.log("🚀 Starting category population...")

  try {
    // Parse the category data
    const categories = parseCategories(categoryData)
    console.log(`📊 Parsed ${categories.length} categories`)

    // Keep track of created categories for parent references
    const createdCategories = new Map<string, string>() // path -> _id

    // Create categories level by level
    for (const category of categories) {
      console.log(`📁 Creating category: ${category.path}`)

      // Find parent ID if this category has a parent
      let parentId: string | undefined
      if (category.parentPath) {
        parentId = createdCategories.get(category.parentPath)
        if (!parentId) {
          console.warn(`⚠️  Parent not found for ${category.path}, skipping...`)
          continue
        }
      }

      // Create the category document
      const doc = {
        _type: "category",
        title: category.title,
        slug: {
          _type: "slug",
          current: category.slug,
        },
        path: category.path,
        level: category.level,
        isRoot: category.level === 0,
        order: categories.filter((c) => c.level === category.level && c.path < category.path).length,
        isActive: true,
        isFeatured: false,
        itemCount: 0,
        ...(parentId && {
          parent: {
            _type: "reference",
            _ref: parentId,
          },
        }),
      }

      try {
        const result = await client.create(doc)
        createdCategories.set(category.path, result._id)
        console.log(`✅ Created: ${category.title} (${result._id})`)
      } catch (error) {
        console.error(`❌ Failed to create ${category.path}:`, error)
      }
    }

    console.log("🔗 Updating subcategories references...")
    for (const [path, categoryId] of createdCategories) {
      const subcategoryIds = Array.from(createdCategories.entries())
        .filter(([subPath]) => {
          const subPathParts = subPath.split("/")
          const pathParts = path.split("/")
          return subPathParts.length === pathParts.length + 1 && subPath.startsWith(path + "/")
        })
        .map(([subPath, id]) => ({
          _type: "reference",
          _ref: id,
          _key: subPath.replace(/\//g, "-").toLowerCase(),
        }))

      if (subcategoryIds.length > 0) {
        await client.patch(categoryId).set({ subcategories: subcategoryIds }).commit()
        console.log(`🔗 Updated subcategories for: ${path}`)
      }
    }

    console.log("🎉 Category population completed!")
    console.log(`📈 Created ${createdCategories.size} categories`)
  } catch (error) {
    console.error("💥 Error populating categories:", error)
  }
}

// Run the script
// populateCategories()
