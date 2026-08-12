import { type StructureBuilder } from 'sanity/structure'

const singletonTypes = new Set(['siteSettings', 'about'])

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.listItem()
        .title('About')
        .id('about')
        .child(S.document().schemaType('about').documentId('about')),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !singletonTypes.has(item.getId() ?? ''),
      ),
    ])
