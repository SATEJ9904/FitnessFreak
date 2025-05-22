import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Slider, 
  TextField, 
  Button, 
  Card, 
  CardContent, 
  Tabs, 
  Tab, 
  Paper, 
  Avatar,
  Chip,
  Fade,
  Grow,
  Zoom
} from '@mui/material';
import { 
  FitnessCenter, 
  Restaurant, 
  SelfImprovement, 
  MonitorHeart, 
  TrendingUp,
  TrendingDown,
  Equalizer
} from '@mui/icons-material';
import { styled } from '@mui/system';

const ColorfulCard = styled(Card)(({ theme, bmicategory }) => ({
  background: bmicategory === 'Underweight' 
    ? 'linear-gradient(135deg, #64b5f6 30%, #42a5f5 90%)'
    : bmicategory === 'Normal' 
    ? 'linear-gradient(135deg, #81c784 30%, #66bb6a 90%)'
    : bmicategory === 'Overweight' 
    ? 'linear-gradient(135deg, #ffb74d 30%, #ffa726 90%)'
    : 'linear-gradient(135deg, #e57373 30%, #ef5350 90%)',
  color: "#fff",
  borderRadius: '16px',
  boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 20px rgba(0,0,0,0.15)'
  }
}));

const BMIProgress = styled(Box)({
  height: '20px',
  borderRadius: '10px',
  background: 'linear-gradient(to right, #64b5f6, #81c784, #ffb74d, #e57373)',
  position: 'relative',
  margin: '20px 0'
});

const ProgressIndicator = styled(Box)(({ bmivalue }) => ({
  position: 'absolute',
  left: `${Math.min(Math.max((bmivalue - 10) / 30 * 100, 0), 100)}%`,
  top: '-10px',
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  backgroundColor: '#fff',
  border: '3px solid #333',
  transform: 'translateX(-50%)'
}));

const BMI_CATEGORIES = [
  { range: [0, 18.5], label: 'Underweight', color: 'info' },
  { range: [18.5, 25], label: 'Normal', color: 'success' },
  { range: [25, 30], label: 'Overweight', color: 'warning' },
  { range: [30, Infinity], label: 'Obese', color: 'error' }
];

const TIPS = {
  Underweight: {
    nutrition: [
      "Increase calorie intake with nutrient-dense foods like nuts, avocados, and whole grains",
      "Eat more frequent, smaller meals throughout the day",
      "Include protein-rich foods in every meal"
    ],
    exercise: [
      "Focus on strength training to build muscle mass",
      "Combine cardio with resistance exercises",
      "Yoga can help improve appetite and digestion"
    ],
    lifestyle: [
      "Ensure adequate sleep for muscle recovery",
      "Manage stress which can affect appetite",
      "Consult a dietitian for personalized advice"
    ]
  },
  Normal: {
    nutrition: [
      "Maintain a balanced diet with variety",
      "Watch portion sizes to maintain your healthy weight",
      "Stay hydrated throughout the day"
    ],
    exercise: [
      "Aim for 150 minutes of moderate exercise weekly",
      "Include both cardio and strength training",
      "Try new activities to keep workouts interesting"
    ],
    lifestyle: [
      "Continue healthy habits",
      "Monitor weight monthly to catch any changes early",
      "Get regular health check-ups"
    ]
  },
  Overweight: {
    nutrition: [
      "Reduce portion sizes gradually",
      "Limit processed foods and sugary drinks",
      "Increase vegetable and fiber intake"
    ],
    exercise: [
      "Start with low-impact activities like walking or swimming",
      "Gradually increase exercise duration and intensity",
      "Find activities you enjoy to stay consistent"
    ],
    lifestyle: [
      "Set realistic weight loss goals (1-2 lbs per week)",
      "Keep a food and activity journal",
      "Get support from friends or a health professional"
    ]
  },
  Obese: {
    nutrition: [
      "Focus on sustainable dietary changes, not quick fixes",
      "Reduce calorie intake while maintaining nutrition",
      "Consider consulting a dietitian for a personalized plan"
    ],
    exercise: [
      "Start with gentle activities and gradually increase",
      "Consider water-based exercises if mobility is limited",
      "Aim for consistent movement throughout the day"
    ],
    lifestyle: [
      "Seek professional medical advice",
      "Address emotional eating patterns if present",
      "Make small, sustainable changes rather than drastic ones"
    ]
  }
};

function BMICalculator() {
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);
  const [age, setAge] = useState(25);
  const [gender, setGender] = useState('male');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [savedResults, setSavedResults] = useState([]);

  useEffect(() => {
    if (height && weight) {
      const heightInMeters = height / 100;
      const calculatedBmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);
      setBmi(calculatedBmi);
      
      const foundCategory = BMI_CATEGORIES.find(cat => 
        calculatedBmi >= cat.range[0] && calculatedBmi < cat.range[1]
      );
      setCategory(foundCategory?.label || 'Unknown');
    }
  }, [height, weight]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const saveResult = () => {
    if (!bmi) return;
    
    const newResult = {
      date: new Date().toLocaleDateString(),
      bmi,
      category,
      height,
      weight
    };
    
    setSavedResults([...savedResults, newResult]);
  };

  const getIconForCategory = () => {
    switch(category) {
      case 'Underweight': return <TrendingUp fontSize="large" />;
      case 'Normal': return <Equalizer fontSize="large" />;
      case 'Overweight': 
      case 'Obese': return <TrendingDown fontSize="large" />;
      default: return <MonitorHeart fontSize="large" />;
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h3" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 4 }}>
        <MonitorHeart sx={{ verticalAlign: 'middle', mr: 2, fontSize: 'inherit' }} />
        Vitality Index Calculator
      </Typography>
      
      <Grow in={true}>
        <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: '16px' }}>
          <Typography variant="h6" gutterBottom>Your Measurements</Typography>
          
          <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
            <Box sx={{ flex: 1 }}>
              <Typography gutterBottom>Height: {height} cm</Typography>
              <Slider
                value={height}
                onChange={(e, val) => setHeight(val)}
                min={100}
                max={250}
                step={1}
                aria-labelledby="height-slider"
              />
            </Box>
            
            <Box sx={{ flex: 1 }}>
              <Typography gutterBottom>Weight: {weight} kg</Typography>
              <Slider
                value={weight}
                onChange={(e, val) => setWeight(val)}
                min={30}
                max={200}
                step={0.5}
                aria-labelledby="weight-slider"
              />
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 3 }}>
            <TextField
              label="Age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              fullWidth
              variant="outlined"
            />
            
            <Box sx={{ flex: 1, display: 'flex', gap: 2, alignItems: 'center' }}>
              <Button 
                variant={gender === 'male' ? 'contained' : 'outlined'} 
                onClick={() => setGender('male')}
                fullWidth
              >
                Male
              </Button>
              <Button 
                variant={gender === 'female' ? 'contained' : 'outlined'} 
                onClick={() => setGender('female')}
                fullWidth
              >
                Female
              </Button>
            </Box>
          </Box>
        </Paper>
      </Grow>
      
      {bmi && category && (
        <Fade in={true}>
          <Box>
            <ColorfulCard bmicategory={category} sx={{ mb: 4 }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h5" component="div">
                    Your Vitality Index
                  </Typography>
                  <Typography variant="h2" component="div" sx={{ fontWeight: 'bold' }}>
                    {bmi}
                  </Typography>
                  <Chip 
                    label={category} 
                    color={BMI_CATEGORIES.find(c => c.label === category)?.color || 'default'} 
                    sx={{ color: 'white', fontWeight: 'bold' }}
                  />
                </Box>
                <Avatar sx={{ width: 80, height: 80, bgcolor: 'rgba(255,255,255,0.2)' }}>
                  {getIconForCategory()}
                </Avatar>
              </CardContent>
            </ColorfulCard>
            
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Your Health Spectrum</Typography>
            <BMIProgress>
              <ProgressIndicator bmivalue={bmi} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                <Typography variant="caption">Underweight</Typography>
                <Typography variant="caption">Normal</Typography>
                <Typography variant="caption">Overweight</Typography>
                <Typography variant="caption">Obese</Typography>
              </Box>
            </BMIProgress>
            
            <Paper elevation={2} sx={{ mt: 4, borderRadius: '16px', overflow: 'hidden' }}>
              <Tabs value={activeTab} onChange={handleTabChange} variant="fullWidth">
                <Tab label="Nutrition" icon={<Restaurant />} iconPosition="start" />
                <Tab label="Exercise" icon={<FitnessCenter />} iconPosition="start" />
                <Tab label="Lifestyle" icon={<SelfImprovement />} iconPosition="start" />
              </Tabs>
              
              <Box sx={{ p: 3 }}>
                {activeTab === 0 && (
                  <Zoom in={true}>
                    <Box>
                      <Typography variant="h6" gutterBottom>Nutrition Tips</Typography>
                      <ul>
                        {TIPS[category]?.nutrition.map((tip, index) => (
                          <li key={index}><Typography>{tip}</Typography></li>
                        ))}
                      </ul>
                    </Box>
                  </Zoom>
                )}
                
                {activeTab === 1 && (
                  <Zoom in={true}>
                    <Box>
                      <Typography variant="h6" gutterBottom>Exercise Recommendations</Typography>
                      <ul>
                        {TIPS[category]?.exercise.map((tip, index) => (
                          <li key={index}><Typography>{tip}</Typography></li>
                        ))}
                      </ul>
                    </Box>
                  </Zoom>
                )}
                
                {activeTab === 2 && (
                  <Zoom in={true}>
                    <Box>
                      <Typography variant="h6" gutterBottom>Lifestyle Suggestions</Typography>
                      <ul>
                        {TIPS[category]?.lifestyle.map((tip, index) => (
                          <li key={index}><Typography>{tip}</Typography></li>
                        ))}
                      </ul>
                    </Box>
                  </Zoom>
                )}
              </Box>
            </Paper>
            
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={saveResult}
                size="large"
                sx={{ borderRadius: '50px', px: 4 }}
              >
                Save My Progress
              </Button>
            </Box>
          </Box>
        </Fade>
      )}
      
      {savedResults.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>Your Progress History</Typography>
          <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', py: 2 }}>
            {savedResults.map((result, index) => (
              <Card key={index} sx={{ minWidth: 200 }}>
                <CardContent>
                  <Typography color="text.secondary">{result.date}</Typography>
                  <Typography variant="h5">{result.bmi}</Typography>
                  <Chip 
                    label={result.category} 
                    size="small"
                    color={BMI_CATEGORIES.find(c => c.label === result.category)?.color || 'default'}
                  />
                  <Typography variant="body2">{result.height}cm, {result.weight}kg</Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      )}
      
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="caption" color="text.secondary">
          Note: BMI is a screening tool but not a diagnostic of body fatness or health. 
          Consult a healthcare provider for more comprehensive assessment.
        </Typography>
      </Box>
    </Box>
  );
}

export default BMICalculator;