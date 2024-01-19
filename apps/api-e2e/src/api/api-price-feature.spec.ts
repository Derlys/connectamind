import { AdminCreatePriceInput, AdminFindManyPriceInput, AdminUpdatePriceInput, Price } from '@connectamind/sdk'
import { getAliceCookie, getBobCookie, sdk, uniqueId } from '../support'

describe('api-price-feature', () => {
  describe('api-price-admin-resolver', () => {
    const priceName = uniqueId('acme-price')
    let priceId: string
    let cookie: string

    beforeAll(async () => {
      cookie = await getAliceCookie()
      const created = await sdk.adminCreatePrice({ input: { name: priceName } }, { cookie })
      priceId = created.data.created.id
    })

    describe('authorized', () => {
      beforeAll(async () => {
        cookie = await getAliceCookie()
      })

      it('should create a price', async () => {
        const input: AdminCreatePriceInput = {
          name: uniqueId('price'),
        }

        const res = await sdk.adminCreatePrice({ input }, { cookie })

        const item: Price = res.data.created
        expect(item.name).toBe(input.name)
        expect(item.id).toBeDefined()
        expect(item.createdAt).toBeDefined()
        expect(item.updatedAt).toBeDefined()
      })

      it('should update a price', async () => {
        const createInput: AdminCreatePriceInput = {
          name: uniqueId('price'),
        }
        const createdRes = await sdk.adminCreatePrice({ input: createInput }, { cookie })
        const priceId = createdRes.data.created.id
        const input: AdminUpdatePriceInput = {
          name: uniqueId('price'),
        }

        const res = await sdk.adminUpdatePrice({ priceId, input }, { cookie })

        const item: Price = res.data.updated
        expect(item.name).toBe(input.name)
      })

      it('should find a list of prices (find all)', async () => {
        const createInput: AdminCreatePriceInput = {
          name: uniqueId('price'),
        }
        const createdRes = await sdk.adminCreatePrice({ input: createInput }, { cookie })
        const priceId = createdRes.data.created.id

        const input: AdminFindManyPriceInput = {}

        const res = await sdk.adminFindManyPrice({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBeGreaterThan(1)
        expect(res.data.paging.data.length).toBeGreaterThan(1)
        // First item should be the one we created above
        expect(res.data.paging.data[0].id).toBe(priceId)
      })

      it('should find a list of prices (find new one)', async () => {
        const createInput: AdminCreatePriceInput = {
          name: uniqueId('price'),
        }
        const createdRes = await sdk.adminCreatePrice({ input: createInput }, { cookie })
        const priceId = createdRes.data.created.id

        const input: AdminFindManyPriceInput = {
          search: priceId,
        }

        const res = await sdk.adminFindManyPrice({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBe(1)
        expect(res.data.paging.data.length).toBe(1)
        expect(res.data.paging.data[0].id).toBe(priceId)
      })

      it('should find a price by id', async () => {
        const createInput: AdminCreatePriceInput = {
          name: uniqueId('price'),
        }
        const createdRes = await sdk.adminCreatePrice({ input: createInput }, { cookie })
        const priceId = createdRes.data.created.id

        const res = await sdk.adminFindOnePrice({ priceId }, { cookie })

        expect(res.data.item.id).toBe(priceId)
      })

      it('should delete a price', async () => {
        const createInput: AdminCreatePriceInput = {
          name: uniqueId('price'),
        }
        const createdRes = await sdk.adminCreatePrice({ input: createInput }, { cookie })
        const priceId = createdRes.data.created.id

        const res = await sdk.adminDeletePrice({ priceId }, { cookie })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.adminFindManyPrice({ input: { search: priceId } }, { cookie })
        expect(findRes.data.paging.meta.totalCount).toBe(0)
        expect(findRes.data.paging.data.length).toBe(0)
      })
    })

    describe('unauthorized', () => {
      let cookie: string
      beforeAll(async () => {
        cookie = await getBobCookie()
      })

      it('should not create a price', async () => {
        expect.assertions(1)
        const input: AdminCreatePriceInput = {
          name: uniqueId('price'),
        }

        try {
          await sdk.adminCreatePrice({ input }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not update a price', async () => {
        expect.assertions(1)
        try {
          await sdk.adminUpdatePrice({ priceId, input: {} }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a list of prices (find all)', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindManyPrice({ input: {} }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a price by id', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindOnePrice({ priceId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not delete a price', async () => {
        expect.assertions(1)
        try {
          await sdk.adminDeletePrice({ priceId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })
    })
  })
})
