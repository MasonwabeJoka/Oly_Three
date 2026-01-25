import { StructureBuilder } from 'sanity/structure'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Posts')
        .child(S.documentTypeList('post').title('Posts')),
      S.listItem()
        .title('Categories')
        .child(S.documentTypeList('category').title('Categories')),
      S.listItem()
        .title('Authors')
        .child(S.documentTypeList('author').title('Authors')),
      ...S.documentTypeListItems().filter(
        (listItem) => !['post', 'category', 'author'].includes(listItem.getId()!)
      ),
    ])