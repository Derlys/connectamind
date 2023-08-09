import { readProjectConfiguration, Tree } from '@nx/devkit'
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing'
import { createMockApi } from '../../lib/api/create-mock-api'

import { apiFeatureGenerator } from './api-feature-generator'
import { ApiFeatureGeneratorSchema } from './api-feature-schema'

describe('api-feature generator', () => {
  let tree: Tree
  const options: ApiFeatureGeneratorSchema = { app: 'api', name: 'test', label: 'name', skipSdk: true }

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace()
  })

  it('should generate the feature libraries', async () => {
    await createMockApi(tree, options.app)

    // By default, we generate two libraries: data-access and feature
    const libs = ['data-access', 'feature']
    await apiFeatureGenerator(tree, options)

    libs.forEach((lib) => {
      const config = readProjectConfiguration(tree, `${options.app}-${options.name}-${lib}`)
      expect(config).toBeDefined()
    })

    const basePathDataAccess = `libs/${options.app}/${options.name}/data-access/src`
    const basePathFeature = `libs/${options.app}/${options.name}/feature/src`

    const files = [
      `${basePathDataAccess}/index.ts`,
      `${basePathDataAccess}/lib/${options.app}-${options.name}-admin.service.ts`,
      `${basePathDataAccess}/lib/${options.app}-${options.name}-data-access.module.ts`,
      `${basePathDataAccess}/lib/${options.app}-${options.name}.service.ts`,
      `${basePathDataAccess}/lib/dto/admin-create-${options.name}.input.ts`,
      `${basePathDataAccess}/lib/dto/admin-find-many-${options.name}.input.ts`,
      `${basePathDataAccess}/lib/dto/admin-update-${options.name}.input.ts`,
      `${basePathDataAccess}/lib/helpers/parse-admin-find-many-${options.name}.ts`,
      `${basePathDataAccess}/lib/entity/${options.name}.entity.ts`,
      `${basePathFeature}/index.ts`,
      `${basePathFeature}/lib/${options.app}-${options.name}-admin.resolver.ts`,
      `${basePathFeature}/lib/${options.app}-${options.name}-feature.module.ts`,
      `${basePathFeature}/lib/${options.app}-${options.name}.resolver.ts`,
    ]

    files.forEach((file) => {
      expect(tree.exists(file)).toBeTruthy()
      expect(tree.read(file).toString()).toMatchSnapshot()
    })
  })

  it('should generate the feature libraries with util lib', async () => {
    await createMockApi(tree, options.app)

    // By default, we generate two libraries: data-access and feature
    const libs = ['data-access', 'feature', 'util']
    await apiFeatureGenerator(tree, { ...options, skipUtil: false })

    libs.forEach((lib) => {
      const config = readProjectConfiguration(tree, `${options.app}-${options.name}-${lib}`)
      expect(config).toBeDefined()
    })
  })

  it('should generate the feature with different name', async () => {
    const testOptions = { ...options, name: 'company' }
    await createMockApi(tree, testOptions.app)

    // By default, we generate two libraries: data-access and feature
    const libs = ['data-access', 'feature', 'util']
    await apiFeatureGenerator(tree, { ...testOptions, skipUtil: false })

    libs.forEach((lib) => {
      const config = readProjectConfiguration(tree, `${testOptions.app}-${testOptions.name}-${lib}`)
      expect(config).toBeDefined()
    })
  })

  it('should generate the feature libraries with custom names', async () => {
    await createMockApi(tree, options.app)

    // By default, we generate two libraries: data-access and feature
    const libs = ['data-access', 'feature']
    const customName = 'custom'
    await apiFeatureGenerator(tree, { ...options, name: customName })

    libs.forEach((lib) => {
      const config = readProjectConfiguration(tree, `${options.app}-${customName}-${lib}`)
      expect(config).toBeDefined()
    })
  })
})
