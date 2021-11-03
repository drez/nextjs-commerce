import type { GetAllProductsOperation } from '@commerce/types/product'
import type { OperationContext } from '@commerce/api/operations'

import type { RawProduct } from '../../types/product'
import type { OrdercloudConfig, Provider } from '../index'

import { normalize as normalizeProduct } from '../../utils/product'

export const baseProductsQuery = {
  select: ['product.name', 'fichier', 'url', 'product.id_product'],
  join: ['product'],
  filter: [
    //['product.expiration_date', Math.floor(Date.now() / 1000), 'gt'],
    ['url', '', 'ne'], ['type', 'Thumbnail'], ['product.status', 'Published']
  ],
  order: [
    ['product.featured_home', 'DESC'], ['product.seen', 'DESC']
  ],
  groupby: ['product.id_product'],
  limit: 4
}

export default function getAllProductsOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getAllProducts<T extends GetAllProductsOperation>({
    config,
  }: {
    query?: string
    variables?: T['variables']
    config?: Partial<OrdercloudConfig>
    preview?: boolean
  } = {}): Promise<T['data']> {
    // Get fetch from the config
    const { restBuyerFetch } = commerce.getConfig(config)

    // Get all products
    const rawProducts: RawProduct[] = await restBuyerFetch<{
      Items: RawProduct[]
    }>('POST', '/ProductFile').then((response) => response.Items)


    const products = rawProducts.data.map((item: any): Product | null => {
      if (item['product.name']) {
        return {
          id: item['product.id_product'],
          entityId: item['product.id_product'],
          name: item['product.name'],
          url: item['url']?.replace('s3://', 'https://s3.amazonaws.com/'),
          path: item['product.id_product']
        }
      }
      return null
    })

    return {
      // Normalize products to commerce schema
      products: rawProducts.map(normalizeProduct),
    }
  }

  return getAllProducts
}
