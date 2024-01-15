import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import Navigation from './src/Navigation';
import { Provider } from 'react-redux';
import { persistor, store } from './src/Store/store';
import { PersistGate } from 'redux-persist/integration/react';

function App(): JSX.Element {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar />
          <Navigation />
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
}

export default App;