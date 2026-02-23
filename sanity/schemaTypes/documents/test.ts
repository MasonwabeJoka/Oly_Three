import {defineType, defineField} from 'sanity'

export const test = defineType({
    name: 'test', 
    title: 'Test',
    type: 'document',
    fields: [
    defineField({
        name: 'testField',
        title: 'Test Field',
        type: 'string',
    })
    ]
})