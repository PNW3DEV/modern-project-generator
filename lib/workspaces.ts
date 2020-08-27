import editJSONFile  from 'edit-json-file'

export const generateWorkspaceConfig = (data: any, skipScripts = false): void => {
  const cwd = process.cwd()
  const lernaFile = editJSONFile(`${cwd}/lerna.json`)
  const rootPackageFile = editJSONFile(`${cwd}/package.json`)
  const currentPackages = lernaFile.get('packages') || rootPackageFile.get('workspaces') || []
  const scripts = rootPackageFile.get('scripts')

  /* Add Packages to Lerna and Yarn Workspaces */
  lernaFile.set('packages', [...currentPackages, data.name])
  rootPackageFile.set('workspaces', [...currentPackages, data.name])
  lernaFile.set('version', 'independent')

  /* Add NPM Scripts start/test/build/deploy script to root package */
  if (!skipScripts) {
    scripts.bootstrap = scripts.bootstrap || 'lerna exec npm install'
    scripts[`build:${data.name}`] = `lerna exec --scope @${data.organization}/${data.name} npm run build`
    scripts[`start:${data.name}`] = `lerna exec --scope @${data.organization}/${data.name} npm start`
    scripts[`test:${data.name}`] = `lerna exec --scope @${data.organization}/${data.name} npm test`
    rootPackageFile.set('scripts', scripts)
  }

  /* Save to Disk */
  lernaFile.save()
  rootPackageFile.save()
}
