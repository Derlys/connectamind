import { AdminCreatePostInput, AdminFindManyPostInput, AdminUpdatePostInput, Post } from '@connectamind/sdk'
import { getAliceCookie, getBobCookie, sdk, uniqueId } from '../support'

describe('api-post-feature', () => {
  describe('api-post-admin-resolver', () => {
    const postName = uniqueId('acme-post')
    let postId: string
    let cookie: string

    beforeAll(async () => {
      cookie = await getAliceCookie()
      const created = await sdk.adminCreatePost({ input: { name: postName } }, { cookie })
      postId = created.data.created.id
    })

    describe('authorized', () => {
      beforeAll(async () => {
        cookie = await getAliceCookie()
      })

      it('should create a post', async () => {
        const input: AdminCreatePostInput = {
          name: uniqueId('post'),
        }

        const res = await sdk.adminCreatePost({ input }, { cookie })

        const item: Post = res.data.created
        expect(item.name).toBe(input.name)
        expect(item.id).toBeDefined()
        expect(item.createdAt).toBeDefined()
        expect(item.updatedAt).toBeDefined()
      })

      it('should update a post', async () => {
        const createInput: AdminCreatePostInput = {
          name: uniqueId('post'),
        }
        const createdRes = await sdk.adminCreatePost({ input: createInput }, { cookie })
        const postId = createdRes.data.created.id
        const input: AdminUpdatePostInput = {
          name: uniqueId('post'),
        }

        const res = await sdk.adminUpdatePost({ postId, input }, { cookie })

        const item: Post = res.data.updated
        expect(item.name).toBe(input.name)
      })

      it('should find a list of posts (find all)', async () => {
        const createInput: AdminCreatePostInput = {
          name: uniqueId('post'),
        }
        const createdRes = await sdk.adminCreatePost({ input: createInput }, { cookie })
        const postId = createdRes.data.created.id

        const input: AdminFindManyPostInput = {}

        const res = await sdk.adminFindManyPost({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBeGreaterThan(1)
        expect(res.data.paging.data.length).toBeGreaterThan(1)
        // First item should be the one we created above
        expect(res.data.paging.data[0].id).toBe(postId)
      })

      it('should find a list of posts (find new one)', async () => {
        const createInput: AdminCreatePostInput = {
          name: uniqueId('post'),
        }
        const createdRes = await sdk.adminCreatePost({ input: createInput }, { cookie })
        const postId = createdRes.data.created.id

        const input: AdminFindManyPostInput = {
          search: postId,
        }

        const res = await sdk.adminFindManyPost({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBe(1)
        expect(res.data.paging.data.length).toBe(1)
        expect(res.data.paging.data[0].id).toBe(postId)
      })

      it('should find a post by id', async () => {
        const createInput: AdminCreatePostInput = {
          name: uniqueId('post'),
        }
        const createdRes = await sdk.adminCreatePost({ input: createInput }, { cookie })
        const postId = createdRes.data.created.id

        const res = await sdk.adminFindOnePost({ postId }, { cookie })

        expect(res.data.item.id).toBe(postId)
      })

      it('should delete a post', async () => {
        const createInput: AdminCreatePostInput = {
          name: uniqueId('post'),
        }
        const createdRes = await sdk.adminCreatePost({ input: createInput }, { cookie })
        const postId = createdRes.data.created.id

        const res = await sdk.adminDeletePost({ postId }, { cookie })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.adminFindManyPost({ input: { search: postId } }, { cookie })
        expect(findRes.data.paging.meta.totalCount).toBe(0)
        expect(findRes.data.paging.data.length).toBe(0)
      })
    })

    describe('unauthorized', () => {
      let cookie: string
      beforeAll(async () => {
        cookie = await getBobCookie()
      })

      it('should not create a post', async () => {
        expect.assertions(1)
        const input: AdminCreatePostInput = {
          name: uniqueId('post'),
        }

        try {
          await sdk.adminCreatePost({ input }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not update a post', async () => {
        expect.assertions(1)
        try {
          await sdk.adminUpdatePost({ postId, input: {} }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a list of posts (find all)', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindManyPost({ input: {} }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a post by id', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindOnePost({ postId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not delete a post', async () => {
        expect.assertions(1)
        try {
          await sdk.adminDeletePost({ postId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })
    })
  })
})
