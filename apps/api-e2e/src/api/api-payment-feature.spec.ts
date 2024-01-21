import { AdminCreatePaymentInput, AdminFindManyPaymentInput, AdminUpdatePaymentInput, Payment } from '@connectamind/sdk'
import { getAliceCookie, getBobCookie, sdk, uniqueId } from '../support'

describe('api-payment-feature', () => {
  describe('api-payment-admin-resolver', () => {
    const paymentName = uniqueId('acme-payment')
    let paymentId: string
    let cookie: string

    beforeAll(async () => {
      cookie = await getAliceCookie()
      const created = await sdk.adminCreatePayment({ input: { name: paymentName } }, { cookie })
      paymentId = created.data.created.id
    })

    describe('authorized', () => {
      beforeAll(async () => {
        cookie = await getAliceCookie()
      })

      it('should create a payment', async () => {
        const input: AdminCreatePaymentInput = {
          name: uniqueId('payment'),
        }

        const res = await sdk.adminCreatePayment({ input }, { cookie })

        const item: Payment = res.data.created
        expect(item.name).toBe(input.name)
        expect(item.id).toBeDefined()
        expect(item.createdAt).toBeDefined()
        expect(item.updatedAt).toBeDefined()
      })

      it('should update a payment', async () => {
        const createInput: AdminCreatePaymentInput = {
          name: uniqueId('payment'),
        }
        const createdRes = await sdk.adminCreatePayment({ input: createInput }, { cookie })
        const paymentId = createdRes.data.created.id
        const input: AdminUpdatePaymentInput = {
          name: uniqueId('payment'),
        }

        const res = await sdk.adminUpdatePayment({ paymentId, input }, { cookie })

        const item: Payment = res.data.updated
        expect(item.name).toBe(input.name)
      })

      it('should find a list of payments (find all)', async () => {
        const createInput: AdminCreatePaymentInput = {
          name: uniqueId('payment'),
        }
        const createdRes = await sdk.adminCreatePayment({ input: createInput }, { cookie })
        const paymentId = createdRes.data.created.id

        const input: AdminFindManyPaymentInput = {}

        const res = await sdk.adminFindManyPayment({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBeGreaterThan(1)
        expect(res.data.paging.data.length).toBeGreaterThan(1)
        // First item should be the one we created above
        expect(res.data.paging.data[0].id).toBe(paymentId)
      })

      it('should find a list of payments (find new one)', async () => {
        const createInput: AdminCreatePaymentInput = {
          name: uniqueId('payment'),
        }
        const createdRes = await sdk.adminCreatePayment({ input: createInput }, { cookie })
        const paymentId = createdRes.data.created.id

        const input: AdminFindManyPaymentInput = {
          search: paymentId,
        }

        const res = await sdk.adminFindManyPayment({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBe(1)
        expect(res.data.paging.data.length).toBe(1)
        expect(res.data.paging.data[0].id).toBe(paymentId)
      })

      it('should find a payment by id', async () => {
        const createInput: AdminCreatePaymentInput = {
          name: uniqueId('payment'),
        }
        const createdRes = await sdk.adminCreatePayment({ input: createInput }, { cookie })
        const paymentId = createdRes.data.created.id

        const res = await sdk.adminFindOnePayment({ paymentId }, { cookie })

        expect(res.data.item.id).toBe(paymentId)
      })

      it('should delete a payment', async () => {
        const createInput: AdminCreatePaymentInput = {
          name: uniqueId('payment'),
        }
        const createdRes = await sdk.adminCreatePayment({ input: createInput }, { cookie })
        const paymentId = createdRes.data.created.id

        const res = await sdk.adminDeletePayment({ paymentId }, { cookie })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.adminFindManyPayment({ input: { search: paymentId } }, { cookie })
        expect(findRes.data.paging.meta.totalCount).toBe(0)
        expect(findRes.data.paging.data.length).toBe(0)
      })
    })

    describe('unauthorized', () => {
      let cookie: string
      beforeAll(async () => {
        cookie = await getBobCookie()
      })

      it('should not create a payment', async () => {
        expect.assertions(1)
        const input: AdminCreatePaymentInput = {
          name: uniqueId('payment'),
        }

        try {
          await sdk.adminCreatePayment({ input }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not update a payment', async () => {
        expect.assertions(1)
        try {
          await sdk.adminUpdatePayment({ paymentId, input: {} }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a list of payments (find all)', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindManyPayment({ input: {} }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a payment by id', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindOnePayment({ paymentId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not delete a payment', async () => {
        expect.assertions(1)
        try {
          await sdk.adminDeletePayment({ paymentId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })
    })
  })
})
