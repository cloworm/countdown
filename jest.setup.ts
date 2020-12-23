import '@testing-library/jest-dom/extend-expect'
import '@testing-library/jest-dom'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))
