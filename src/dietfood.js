import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Chip, 
  Avatar,
  Paper,
  Divider,
  useTheme,
  LinearProgress,
  Tooltip,
  IconButton
} from '@mui/material';
import { 
  LocalDining, 
  MonitorWeight, 
  Calculate, 
  Favorite, 
  Scale, 
  Height, 
  Restaurant,
  Info,
  Download,
  FavoriteBorder,
  Share,
  HealthAndSafety,
  RestaurantMenu ,
  FitnessCenter
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import Papa from 'papaparse';
import foodDataCSV from './BMI_based_food_items.csv'; // Your CSV file path

// Creative animations
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } }
};

const slideUp = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
};

const BMIRecommendationApp = () => {
  const theme = useTheme();
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [foodData, setFoodData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [showDetails, setShowDetails] = useState(null);

  // Load food data from CSV
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(foodDataCSV);
        const reader = response.body.getReader();
        const result = await reader.read();
        const decoder = new TextDecoder('utf-8');
        const csv = decoder.decode(result.value);
        
        Papa.parse(csv, {
          header: true,
          complete: (results) => {
            setFoodData(results.data.map(item => ({
              ...item,
              Calories_kcal: parseFloat(item.Calories_kcal),
              Carbs_g: parseFloat(item.Carbs_g),
              Protein_g: parseFloat(item.Protein_g),
              Fat_g: parseFloat(item.Fat_g),
              Fiber_g: parseFloat(item.Fiber_g)
            })));
            setLoading(false);
          }
        });
      } catch (error) {
        console.error("Error loading CSV:", error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const calculateBMI = () => {
    if (!height || !weight) return;
    
    const heightInMeters = height / 100;
    const calculatedBmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);
    setBmi(calculatedBmi);

    let newCategory = '';
    if (calculatedBmi < 18.5) {
      newCategory = 'Underweight';
    } else if (calculatedBmi >= 18.5 && calculatedBmi < 25) {
      newCategory = 'Normal weight';
    } else if (calculatedBmi >= 25 && calculatedBmi < 30) {
      newCategory = 'Overweight';
    } else {
      newCategory = 'Obese';
    }
    setCategory(newCategory);

    // Filter food recommendations
    const filteredFoods = foodData.filter(food => food.BMI_Category === newCategory);
    setRecommendations(filteredFoods);
  };

  const getCategoryColor = () => {
    switch(category) {
      case 'Underweight': return 'warning';
      case 'Normal weight': return 'success';
      case 'Overweight': return 'secondary';
      case 'Obese': return 'error';
      default: return 'primary';
    }
  };

  const toggleFavorite = (foodName) => {
    if (favorites.includes(foodName)) {
      setFavorites(favorites.filter(f => f !== foodName));
    } else {
      setFavorites([...favorites, foodName]);
    }
  };

  const toggleDetails = (index) => {
    setShowDetails(showDetails === index ? null : index);
  };

  const getHealthTips = () => {
    switch(category) {
      case 'Underweight':
        return [
          "Eat frequent, nutrient-dense meals",
          "Include healthy fats like avocados and nuts",
          "Try smoothies with protein powder",
          "Strength training can help build muscle"
        ];
      case 'Normal weight':
        return [
          "Maintain a balanced diet with variety",
          "Stay active with 150 mins exercise/week",
          "Monitor portion sizes to maintain weight",
          "Include all food groups in your diet"
        ];
      case 'Overweight':
        return [
          "Focus on portion control",
          "Increase vegetable intake",
          "Limit processed foods and sugars",
          "Aim for 30 mins of activity daily"
        ];
      case 'Obese':
        return [
          "Consult a healthcare provider",
          "Set realistic weight loss goals",
          "Keep a food diary to track intake",
          "Gradually increase physical activity"
        ];
      default:
        return [];
    }
  };

  if (loading) {
    return (
      <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{ width: '50%', textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>Loading delicious food options...</Typography>
          <LinearProgress color="secondary" />
        </Box>
      </Box>
    );
  }
   
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Animated Hero Section */}
      <Box sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        color: 'white',
        py: 8,
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Container maxWidth="md">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
              <LocalDining sx={{ fontSize: 48, verticalAlign: 'middle', mr: 2 }} />
              NutriGuide Pro
            </Typography>
            <Typography variant="h5" sx={{ mb: 4 }}>
              Your personalized nutrition companion powered by AI
            </Typography>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="contained" 
                color="secondary" 
                size="large"
                startIcon={<Download />}
                sx={{ borderRadius: 5, px: 4, py: 1.5 }}
                href={foodDataCSV}
                download
              >
                Download Full Food Database
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Decorative elements */}
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            zIndex: 0
          }}>
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                style={{
                  position: 'absolute',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '50%'
                }}
                initial={{
                  width: Math.random() * 100 + 50,
                  height: Math.random() * 100 + 50,
                  x: Math.random() * 100,
                  y: Math.random() * 100,
                  opacity: 0
                }}
                animate={{
                  x: Math.random() * 100,
                  y: Math.random() * 100,
                  opacity: [0, 0.1, 0],
                  transition: {
                    duration: Math.random() * 10 + 10,
                    repeat: Infinity,
                    repeatType: 'reverse'
                  }
                }}
              />
            ))}
          </Box>
        </Container>
      </Box>

      {/* Interactive BMI Calculator */}
      <Container maxWidth="md" sx={{ py: 6 }}>
        <motion.div variants={slideUp}>
          <Paper elevation={4} sx={{ 
            p: 4, 
            borderRadius: 4,
            background: `linear-gradient(to bottom right, ${theme.palette.background.paper}, ${theme.palette.grey[100]})`,
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Decorative corner */}
            <Box sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: 0,
              height: 0,
              borderStyle: 'solid',
              borderWidth: '0 100px 100px 0',
              borderColor: `transparent ${theme.palette.secondary.light} transparent transparent`,
              zIndex: 0
            }} />
            
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3, position: 'relative' }}>
              <MonitorWeight sx={{ mr: 2, verticalAlign: 'middle' }} />
              Smart BMI Analyzer
              <Tooltip title="Body Mass Index (BMI) is a measure of body fat based on height and weight">
                <Info sx={{ ml: 1, verticalAlign: 'middle', fontSize: 20 }} />
              </Tooltip>
            </Typography>
            
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Height (cm)"
                  variant="outlined"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  InputProps={{
                    startAdornment: <Height sx={{ mr: 1, color: 'action.active' }} />
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: theme.palette.primary.main,
                      },
                      '&:hover fieldset': {
                        borderColor: theme.palette.primary.dark,
                      },
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Weight (kg)"
                  variant="outlined"
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  InputProps={{
                    startAdornment: <Scale sx={{ mr: 1, color: 'action.active' }} />
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: theme.palette.primary.main,
                      },
                      '&:hover fieldset': {
                        borderColor: theme.palette.primary.dark,
                      },
                    }
                  }}
                />
              </Grid>
            </Grid>

            <motion.div whileHover={{ scale: 1.02 }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<Calculate />}
                onClick={calculateBMI}
                sx={{
                  borderRadius: 50,
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                  background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  '&:hover': {
                    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
                    background: `linear-gradient(45deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
                  }
                }}
              >
                Analyze My Nutrition Needs
              </Button>
            </motion.div>

            {bmi && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Box sx={{ 
                  mt: 4, 
                  p: 3, 
                  bgcolor: 'background.paper', 
                  borderRadius: 2,
                  borderLeft: `5px solid ${theme.palette[getCategoryColor()].main}`
                }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h5" sx={{ mb: 1 }}>
                      Your Results: <strong>{bmi}</strong> BMI
                    </Typography>
                    <Chip
                      label={category}
                      color={getCategoryColor()}
                      size="medium"
                      icon={<HealthAndSafety />}
                      sx={{ 
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        px: 2,
                        py: 1
                      }}
                    />
                  </Box>
                  
                  <Typography variant="body1" sx={{ mt: 2, mb: 3 }}>
                    {category === 'Underweight' && 'Your BMI suggests you may be underweight. Focus on nutrient-rich, calorie-dense foods to support healthy weight gain.'}
                    {category === 'Normal weight' && 'Great job! Your BMI is in the healthy range. Maintain your balanced diet and active lifestyle.'}
                    {category === 'Overweight' && 'Your BMI suggests you may be overweight. Consider portion control and increasing physical activity.'}
                    {category === 'Obese' && 'Your BMI suggests obesity. Focus on gradual, sustainable changes and consult a healthcare provider.'}
                  </Typography>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    <FitnessCenter sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Health Tips
                  </Typography>
                  
                  <Grid container spacing={2}>
                    {getHealthTips().map((tip, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Paper elevation={0} sx={{ 
                          p: 2, 
                          bgcolor: 'background.default',
                          borderRadius: 2,
                          display: 'flex',
                          alignItems: 'center'
                        }}>
                          <Favorite sx={{ 
                            color: theme.palette.secondary.main, 
                            mr: 1,
                            fontSize: 20
                          }} />
                          <Typography variant="body2">{tip}</Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </motion.div>
            )}
          </Paper>
        </motion.div>
      </Container>

      {/* Personalized Food Recommendations */}
      {recommendations.length > 0 && (
        <Container maxWidth="lg" sx={{ py: 6 }}>
          <motion.div variants={fadeIn}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
              <RestaurantMenu  sx={{ mr: 2, verticalAlign: 'middle' }} />
              Your Personalized Nutrition Plan for {category}
              <Tooltip title="These recommendations are tailored to your BMI category">
                <Info sx={{ ml: 1, verticalAlign: 'middle', fontSize: 24 }} />
              </Tooltip>
            </Typography>
            
            <Grid container spacing={4}>
              {recommendations.map((food, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <motion.div
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                    variants={slideUp}
                  >
                    <Card sx={{ 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column',
                      borderRadius: 3,
                      boxShadow: 3,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: 6,
                        transform: 'translateY(-5px)'
                      }
                    }}>
                      <Box sx={{ position: 'relative' }}>
                        <CardMedia
                          component="img"
                          height="180"
                          image={food.image || 'https://images.unsplash.com/photo-1490645935967-10de6ba17061'}
                          alt={food.Food_Name}
                        />
                        <IconButton
                          sx={{ 
                            position: 'absolute', 
                            top: 8, 
                            right: 8,
                            backgroundColor: 'rgba(255,255,255,0.7)',
                            '&:hover': {
                              backgroundColor: 'rgba(255,255,255,0.9)'
                            }
                          }}
                          onClick={() => toggleFavorite(food.Food_Name)}
                        >
                          <Favorite 
                            sx={{ 
                              color: favorites.includes(food.Food_Name) ? 
                                theme.palette.error.main : 
                                theme.palette.grey[400]
                            }} 
                          />
                        </IconButton>
                      </Box>
                      
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography gutterBottom variant="h5" component="div">
                            {food.Food_Name}
                          </Typography>
                          <IconButton onClick={() => toggleDetails(index)}>
                            <Info color={showDetails === index ? 'primary' : 'inherit'} />
                          </IconButton>
                        </Box>
                        
                        {/* Nutrition Summary */}
                        <Box sx={{ 
                          display: 'flex', 
                          flexWrap: 'wrap', 
                          gap: 1, 
                          mb: 2,
                          justifyContent: 'center'
                        }}>
                          <Tooltip title="Calories">
                            <Chip 
                              label={`🔥 ${food.Calories_kcal}`} 
                              color="primary" 
                              size="small" 
                              variant="outlined"
                            />
                          </Tooltip>
                          <Tooltip title="Protein">
                            <Chip 
                              label={`💪 ${food.Protein_g}g`} 
                              color="secondary" 
                              size="small" 
                              variant="outlined"
                            />
                          </Tooltip>
                          <Tooltip title="Carbs">
                            <Chip 
                              label={`🍞 ${food.Carbs_g}g`} 
                              color="info" 
                              size="small" 
                              variant="outlined"
                            />
                          </Tooltip>
                        </Box>
                        
                        {/* Detailed Nutrition (shown when expanded) */}
                        {showDetails === index && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            transition={{ duration: 0.3 }}
                          >
                            <Divider sx={{ my: 2 }} />
                            
                            <Grid container spacing={1} sx={{ mb: 2 }}>
                              <Grid item xs={6}>
                                <Typography variant="body2">
                                  <strong>Fat:</strong> {food.Fat_g}g
                                </Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography variant="body2">
                                  <strong>Fiber:</strong> {food.Fiber_g}g
                                </Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography variant="body2">
                                  <strong>Vitamins:</strong> {food.Vitamins}
                                </Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography variant="body2">
                                  <strong>Minerals:</strong> {food.Minerals}
                                </Typography>
                              </Grid>
                            </Grid>
                            
                            <Box sx={{ 
                              backgroundColor: theme.palette.grey[100],
                              p: 1,
                              borderRadius: 1,
                              textAlign: 'center'
                            }}>
                              <Typography variant="caption">
                                {category === 'Underweight' && 'Great for healthy weight gain!'}
                                {category === 'Normal weight' && 'Perfect for maintaining health!'}
                                {category === 'Overweight' && 'Helps with weight management!'}
                                {category === 'Obese' && 'Supports healthy weight loss!'}
                              </Typography>
                            </Box>
                          </motion.div>
                        )}
                      </CardContent>
                      
                      {/* <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                        <Button 
                          size="small" 
                          startIcon={<Share />}
                          sx={{ borderRadius: 5 }}
                        >
                          Share
                        </Button>
                        <Button 
                          size="small" 
                          color="primary"
                          sx={{ borderRadius: 5 }}
                          onClick={() => toggleDetails(index)}
                        >
                          {showDetails === index ? 'Less Info' : 'More Info'}
                        </Button>
                      </Box> */}
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      )}

      {/* Interactive Footer */}
      <Box sx={{ 
        bgcolor: 'background.paper',
        py: 4,
        mt: 6,
        borderTop: `1px solid ${theme.palette.divider}`,
        position: 'relative'
      }}>
        <Container maxWidth="md">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                About NutriGuide Pro
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Our AI-powered nutrition platform provides personalized food recommendations based on your BMI, 
                helping you achieve your health goals through science-backed dietary guidance.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Quick Links
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Button variant="text" size="small">Privacy Policy</Button>
                <Button variant="text" size="small">Terms of Service</Button>
                <Button variant="text" size="small">Contact Us</Button>
                <Button variant="text" size="small">API</Button>
              </Box>
            </Grid>
          </Grid>
          
          <Divider sx={{ my: 3 }} />
          
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} NutriGuide Pro - Personalized BMI-based nutrition recommendations
          </Typography>
          
          {/* Decorative footer element */}
          <Box sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '4px',
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            zIndex: 1
          }} />
        </Container>
      </Box>
    </Box>
  );
};

export default BMIRecommendationApp;