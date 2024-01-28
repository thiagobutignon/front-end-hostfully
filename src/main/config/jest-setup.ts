import '@testing-library/jest-dom'
import 'firebase/compat/auth'

import firebase from 'firebase/compat/app'

const firebaseConfig = {
  apiKey: 'AIzaSyBPZxSV3e__O9Er42iIOHZmprHUXqhKgW0',
  authDomain: 'metaoriginal-related-app.firebaseapp.com',
  databaseURL: 'https://metaoriginal-related-app-default-rtdb.firebaseio.com',
  projectId: 'metaoriginal-related-app',
  storageBucket: 'metaoriginal-related-app.appspot.com',
  messagingSenderId: '18199155015',
  appId: '1:18199155015:web:d67ade9d20742c0b497c62',
  measurementId: 'G-81BMDL8C60'
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export default firebase

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
})
