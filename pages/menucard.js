import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  card: {
    marginBottom: theme.spacing(2),
    backgroundColor: '#F5F5F5',
    borderRadius: theme.spacing(1),
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  cardMedia: {
    height: 200,
    borderRadius: theme.spacing(1),
  },
  accordion: {
    marginBottom: theme.spacing(2),
    backgroundColor: '#F5F5F5',
    borderRadius: theme.spacing(1),
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  tab: {
    fontWeight: 600,
    fontFamily: 'Arial',
    color: '#333333',
    '&:hover': {
      color: '#555555',
    },
  },
  selectedTab: {
    color: '#555555',
    borderBottom: `2px solid #555555`,
  },
  appBar: {
    backgroundColor: '#F8F8F8',
    boxShadow: 'none',
  },
  tabs: {
    borderBottom: `2px solid #E0E0E0`,
  },
  categoryPizza: {
    color: '#FF5722',
  },
  categoryMeat: {
    color: '#4CAF50',
  },
  categorySalad: {
    color: '#03A9F4',
  },
  categoryPasta: {
    color: '#FFEB3B',
  },
  categoryDessert: {
    color: '#9C27B0',
  },
}))

const MenuPlanning = () => {
  const classes = useStyles()
  const [selectedTab, setSelectedTab] = React.useState(0)

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue)
  }

  const dailyMenu = [
    {
      dish: 'Steak au poivre',
      image: 'https://source.unsplash.com/featured/?steak',
      category: 'meat',
    },
    {
      dish: 'Salade de tomates',
      image: 'https://source.unsplash.com/featured/?salad',
      category: 'salad',
    },
    {
      dish: 'Pâtes à la carbonara',
      image: 'https://source.unsplash.com/featured/?pasta',
      category: 'pasta',
    },
    {
      dish: 'Gâteau au chocolat',
      image: 'https://source.unsplash.com/featured/?dessert',
      category: 'dessert',
    },
  ]

  const weeklyMenu = [
    {
      day: 'Lundi',
      dishes: [
        {
          dish: 'Pizza margherita',
          image: 'https://source.unsplash.com/featured/?pizza',
          category: 'pizza',
        },
        {
          dish: 'Salade César',
          image: 'https://source.unsplash.com/featured/?salad',
          category: 'salad',
        },
      ],
    },
    {
      day: 'Mardi',
      dishes: [
        {
          dish: 'Poulet rôti',
          image: 'https://source.unsplash.com/featured/?chicken',
          category: 'meat',
        },
        {
          dish: 'Pâtes à la carbonara',
          image: 'https://source.unsplash.com/featured/?pasta',
          category: 'pasta',
        },
      ],
    },
    // ... Ajoutez les plats pour les autres jours de la semaine
  ]

  const renderMenuItems = (menu) => {
    return (
      <Grid container spacing={2}>
        {menu.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia className={classes.cardMedia} image={item.image} title={item.dish} />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="h2"
                    className={classes[`category${item.category}`]}
                  >
                    {item.dish}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <div
                style={{
                  background:
                    item.category === 'pizza'
                      ? 'linear-gradient(to bottom, #FF5722 0%, #FF5722 100%)'
                      : item.category === 'meat'
                      ? 'linear-gradient(to bottom, #4CAF50 0%, #4CAF50 100%)'
                      : item.category === 'salad'
                      ? 'linear-gradient(to bottom, #03A9F4 0%, #03A9F4 100%)'
                      : item.category === 'pasta'
                      ? 'linear-gradient(to bottom, #FFEB3B 0%, #FFEB3B 100%)'
                      : item.category === 'dessert'
                      ? 'linear-gradient(to bottom, #9C27B0 0%, #9C27B0 100%)'
                      : '',
                  height: '4px',
                }}
              ></div>
            </Card>
          </Grid>
        ))}
      </Grid>
    )
  }

  const renderWeeklyMenu = () => {
    return (
      <div>
        {weeklyMenu.map((dayMenu, index) => (
          <Accordion key={index} className={classes.accordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel-${index}`}
              id={`panel-${index}`}
            >
              <Typography variant="h6">{dayMenu.day}</Typography>
            </AccordionSummary>
            <AccordionDetails>{renderMenuItems(dayMenu.dishes)}</AccordionDetails>
          </Accordion>
        ))}
      </div>
    )
  }

  const renderDailyMenu = () => {
    const categories = Array.from(new Set(dailyMenu.map((item) => item.category)))

    return (
      <div>
        {categories.map((category, index) => (
          <Accordion key={index} className={classes.accordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel-${index}`}
              id={`panel-${index}`}
            >
              <Typography variant="h6">{category}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {renderMenuItems(dailyMenu.filter((item) => item.category === category))}
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    )
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Tabs value={selectedTab} onChange={handleTabChange} className={classes.tabs}>
          <Tab
            label="Plats Journaliers"
            className={`${classes.tab} ${selectedTab === 0 ? classes.selectedTab : ''}`}
          />
          <Tab
            label="Planning Semaine"
            className={`${classes.tab} ${selectedTab === 1 ? classes.selectedTab : ''}`}
          />
        </Tabs>
      </AppBar>
      {selectedTab === 0 && (
        <div>
          <Typography variant="h6" gutterBottom></Typography>
          {renderDailyMenu()}
        </div>
      )}
      {selectedTab === 1 && (
        <div>
          <Typography variant="h6" gutterBottom></Typography>
          {renderWeeklyMenu()}
        </div>
      )}
    </div>
  )
}

export default MenuPlanning
