import { execSync } from 'child_process'
import { mkdirSync, rmSync } from 'fs'
import { dirname, join } from 'path'

const localRegistryPrefix = 'npm_config_registry=http://localhost:4873'

describe('create-routineless-app', () => {
  let projectDirectory: string

  afterAll(() => {
    // Cleanup the test project
    rmSync(projectDirectory, {
      recursive: true,
      force: true,
    })
  })

  it('should be installed', () => {
    projectDirectory = createTestProject('-i infra -l lambda')

    // npm ls will fail if the package is not installed properly
    execSync('npm ls @routineless/nx-plugin', {
      cwd: projectDirectory,
      stdio: 'inherit',
    })
  })
})

/**
 * Creates a test project with create-nx-workspace and installs the plugin
 * @returns The directory where the test project was created
 */
function createTestProject(extraArgs = '') {
  const projectName = 'test-project'
  const projectDirectory = join(process.cwd(), 'tmp', projectName)

  // Ensure projectDirectory is empty
  rmSync(projectDirectory, {
    recursive: true,
    force: true,
  })
  mkdirSync(dirname(projectDirectory), {
    recursive: true,
  })

  execSync(`${localRegistryPrefix} npx --yes create-routineless-app@local ${projectName} ${extraArgs}`, {
    cwd: dirname(projectDirectory),
    stdio: 'inherit',
    env: process.env,
  })
  console.log(`Created test project in "${projectDirectory}"`)

  return projectDirectory
}
