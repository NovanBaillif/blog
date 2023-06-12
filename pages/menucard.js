import React from 'react'
import { useState } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const MenuPlanning = () => {
  const [selectedTab, setSelectedTab] = useState(0)

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue)
  }

  const dailyMenu = [
    // Vos plats quotidiens
  ]

  const weeklyMenu = [
    // Votre menu hebdomadaire
  ]

  const renderMenuItems = (menu) => {
    return (
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
        {menu.map((item, index) => (
          <div key={index} className="rounded-lg bg-gray-100 shadow-md">
            <img
              src={item.image}
              alt={item.dish}
              className="h-48 w-full rounded-t-lg object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-medium">{item.dish}</h2>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const renderWeeklyMenu = () => {
    return (
      <div>
        {weeklyMenu.map((dayMenu, index) => (
          <div key={index} className="mb-4">
            <button
              className="flex w-full items-center justify-between rounded-lg bg-gray-100 p-4"
              type="button"
              onClick={() => {}}
            >
              <h2 className="text-lg font-medium">{dayMenu.day}</h2>
              <ExpandMoreIcon className="text-gray-500" />
            </button>
            <div>{renderMenuItems(dayMenu.dishes)}</div>
          </div>
        ))}
      </div>
    )
  }

  const renderDailyMenu = () => {
    const categories = Array.from(new Set(dailyMenu.map((item) => item.category)))

    return (
      <div>
        {categories.map((category, index) => (
          <div key={index} className="mb-4">
            <button
              className="flex w-full items-center justify-between rounded-lg bg-gray-100 p-4"
              type="button"
              onClick={() => {}}
            >
              <h2 className="text-lg font-medium">{category}</h2>
              <ExpandMoreIcon className="text-gray-500" />
            </button>
            <div>{renderMenuItems(dailyMenu.filter((item) => item.category === category))}</div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <button
          className={`rounded-tl-lg px-4 py-2 text-lg font-medium focus:outline-none ${
            selectedTab === 0 ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-800'
          }`}
          onClick={(e) => handleTabChange(e, 0)}
        >
          Plats Journaliers
        </button>
        <button
          className={`rounded-tr-lg px-4 py-2 text-lg font-medium focus:outline-none ${
            selectedTab === 1 ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-800'
          }`}
          onClick={(e) => handleTabChange(e, 1)}
        >
          Planning Semaine
        </button>
      </div>
      {selectedTab === 0 && <div>{renderDailyMenu()}</div>}
      {selectedTab === 1 && <div>{renderWeeklyMenu()}</div>}
    </div>
  )
}

export default MenuPlanning
