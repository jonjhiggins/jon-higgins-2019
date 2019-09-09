/**
 * From Adam Laycock:
 * https://arcath.net/2019/01/netlify-cms-on-the-filesystem-with-gatsby
 */

import CMS, { init } from 'netlify-cms-app'
import * as FileSystemBackend from 'netlify-cms-backend-fs'

console.log(FileSystemBackend)

// If running in development
if (process.env.NODE_ENV === 'development') {
  window.CMS_ENV = 'development_overrides' // Set the CMS_ENV to the development_ overrides.
  CMS.registerBackend('file-system', FileSystemBackend) // Register the FileSystemBackend.
}



// Start NetlifyCMS
init()
