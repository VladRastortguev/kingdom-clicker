import { ResourceBar } from './components/RecourceBar/ResourceBar'
import { GatheringPanel } from './components/GatheringPanel/GatheringPanel'
import { UpgardeShop } from './components/UpgradeShop/UpgradeShop'
import { useProduction } from './hooks/useProduction'
import { BuildingShop } from './components/BuildingShop/BuildingShop'
import './App.css'
// import { StoreDebug } from './components/StoreDebug'
import TradingShop from './components/TradingShop/TradingShop'



function App() {
  useProduction()

  return (
    <div className='app'>
      <ResourceBar />

      <main className='game-content'>
        <GatheringPanel />
        <UpgardeShop />

        {/* <StoreDebug /> */}
        <TradingShop />
        <BuildingShop />
      </main>
    </div>
  )
}

export default App
