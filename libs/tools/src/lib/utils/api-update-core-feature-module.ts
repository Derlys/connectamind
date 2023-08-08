import { Tree } from '@nrwl/devkit'
import { addNamedImport } from './add-named-import'
import { updateSourceFile } from './update-source-file'

export function apiUpdateCoreFeatureModule(
  tree: Tree,
  path: string,
  {
    featureClass,
    featurePackage,
  }: {
    featureClass: string
    featurePackage: string
  },
) {
  updateSourceFile(tree, path, (source) => {
    addNamedImport(source, featurePackage, featureClass)

    const importsVariable = source.getVariableStatement('imports')

    if (importsVariable) {
      // FIXME: there might be a better way to add this import to the array of imports
      source.insertText(importsVariable.getEnd() - 3, `, ${featureClass}`)
    }
    return source
  })
}
