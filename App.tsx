import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import NavigationTabs from './src/helper/NavigationTabs'
import { StatusBar } from 'react-native'

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar hidden={true} />
      <NavigationTabs />
    </SafeAreaProvider>
  )
}

export default App