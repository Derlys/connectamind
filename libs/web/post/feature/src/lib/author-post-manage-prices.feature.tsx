import { Post, Token } from '@connectamind/sdk'
import { useUserFindOnePost } from '@connectamind/web-post-data-access'
import { UiInfo, UiStack } from '@connectamind/web-ui-core'
import { UserPriceUiCreateForm, UserPriceUiUpdateForm } from '@connectamind/web-price-ui'

export function AuthorPostManagePricesFeature({ post }: { post: Post }) {
  const { createPrice, deletePrice, updatePrice } = useUserFindOnePost({ postId: post.id })
  const tokens = Object.keys(Token) as Token[]
  const used = post.prices?.map((p) => p.token) ?? []
  const available = tokens.filter((t) => !used.includes(t))
  return (
    <UiStack>
      <UiInfo
        title="Post Prices"
        message={'You can monetize your content by adding a price in one of the following tokens.'}
      />
      {post.prices?.map((price) => (
        <UserPriceUiUpdateForm key={price.id} price={price} deletePrice={deletePrice} updatePrice={updatePrice} />
      ))}
      {available.map((token) => (
        <UserPriceUiCreateForm key={token} token={token} submit={createPrice} />
      ))}
    </UiStack>
  )
}
