/**
 * @Author: Rostislav Simonik <rostislav.simonik>
 * @Date:   2018-01-30T15:49:24+01:00
 * @Email:  rostislav.simonik@technologystudio.sk
 * @Copyright: Technology Studio
 * @flow
 */

import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

// Mock your external modules here if needed
// jest
// .mock('package', () => {
//   return { isTablet: jest.fn(() => { return false }) }
// })
