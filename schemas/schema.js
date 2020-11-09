// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

import { saneShopify } from '@sane-shopify/sanity-plugin'

const saneShopifyConfig = {
    product: {
        fields: [
        // Shopify's HTML description input can get messy. Let's have our users enter the descriptions using Sanity's rich text instead.
        {
            name: 'description',
            title: 'Description',
            type: 'array',
            of: [{ type: 'block' }]
        },

        // Our users won't be editing fields on product variants. Let's hide that field. This will merge the "hidden" value into the sane-shoipfy defaults:
        {
            name: 'variants',
            hidden: true
        }
        ]
    },
}

const saneShopifyTypes = saneShopify(saneShopifyConfig)

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */
    ...saneShopifyTypes
  ])
})
