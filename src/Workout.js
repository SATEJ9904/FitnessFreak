import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  Paper,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import { 
  FitnessCenter,
  Favorite,
  Whatshot,
  AccessibilityNew,
  DirectionsRun,
} from '@mui/icons-material';
import Lottie from 'react-lottie';
import { motion } from 'framer-motion';

// Import your Lottie animations
import pushUpAnimation2 from "./Workouts/PushUp2.json";
import pushUpAnimation3 from "./Workouts/EXE1.json";
import pushUpAnimation4 from "./Workouts/EXE2.json";
import pushUpAnimation5 from "./Workouts/EXE3.json";
import pushUpAnimation7 from "./Workouts/EXE5.json";
import pushUpAnimation8 from "./Workouts/EXE6.json";
import pushUpAnimation9 from "./Workouts/EXE7.json";
import pushUpAnimation10 from "./Workouts/EXE8.json";
import pushUpAnimation11 from "./Workouts/EXE9.json";
import pushUpAnimation12 from "./Workouts/EXE10.json";
import exercise13 from "./Workouts/EXE13.json";
import exercise14 from "./Workouts/EXE14.json";
import exercise15 from "./Workouts/EXE15.json";
import exercise16 from "./Workouts/EXE16.json";
import exercise17 from "./Workouts/EXE17.json";
import exercise18 from "./Workouts/EX18.json";
import exercise19 from "./Workouts/EX19.json";
import exercise20 from "./Workouts/EX20.json";
import exercise21 from "./Workouts/EX48.json";
import exercise22 from "./Workouts/EX22.json";
import exercise23 from "./Workouts/EX23.json";
import exercise24 from "./Workouts/EX24.json";
import exercise25 from "./Workouts/EX25.json";
import exercise26 from "./Workouts/EX26.json";
import exercise27 from "./Workouts/EX27.json";
import exercise28 from "./Workouts/EX28.json";
import exercise29 from "./Workouts/EX29.json";
import exercise30 from "./Workouts/EX30.json";
import exercise31 from "./Workouts/EX31.json";
import exercise32 from "./Workouts/EX32.json";
import exercise33 from "./Workouts/EX33.json";
import exercise34 from "./Workouts/EX34.json";
import exercise35 from "./Workouts/EX35.json";
import exercise36 from "./Workouts/EX36.json";
import exercise37 from "./Workouts/EX37.json";
import exercise38 from "./Workouts/EX38.json";
import exercise39 from "./Workouts/EX39.json";
import exercise40 from "./Workouts/EX40.json";
import exercise41 from "./Workouts/EX41.json";
import exercise42 from "./Workouts/EX42.json";
import exercise43 from "./Workouts/EX43.json";
import exercise44 from "./Workouts/EX44.json";
import exercise45 from "./Workouts/EX45.json";
import exercise46 from "./Workouts/EX46.json";
import exercise47 from "./Workouts/EX47.json";
import exercise48 from "./Workouts/EX48.json";
import exercise49 from "./Workouts/EX49.json";

// Animation mapping
const animationMap = {
  "Push Up": pushUpAnimation2,
  "Plank Twists": pushUpAnimation3,
  "Squats": exercise13,
  "Bicep Curls": exercise14,
  "Shoulder Press": exercise15,
  "Rope Skipping": exercise16,
  "Crunches": exercise17,
  "Burpee": pushUpAnimation4,
  "Fish Squats": pushUpAnimation5,
  "Pull Rope": exercise18,
  "High Knees": exercise47,
  "Alternate Crunches": exercise21,
  "Lower Abs": exercise49,
  "Weight Lifting": pushUpAnimation7,
  "Squats Twists": pushUpAnimation8,
  "Middle Abs": exercise23,
  "Rope Jump": exercise24,
  "Biceps": exercise25,
  "Back Lats": exercise27,
  "Leg Raise Squats": pushUpAnimation9,
  "Jump Squats": pushUpAnimation10,
  "Push Ups": exercise28,
  "Step Ups": exercise29,
  "Twist Plank": exercise30,
  "Glute Bridge": exercise31,
  "Body Core": exercise32,
  "Lower Abdominal": pushUpAnimation11,
  "Tricep Dips": exercise33,
  "Lunges": exercise34,
  "Pushups": pushUpAnimation2,
  "Half Pushups": exercise36,
  "Stretch Jump": pushUpAnimation10,
  "Yoga Flow": exercise38,
  "Dynamic Stretching": exercise40,
  "Side Crunches": exercise41,
  "Plank": exercise42
};

// Complete exercise database with benefits and target areas
const exercises = [
  {
    name: "Push Up",
    animation: "Push Up",
    bodyPart: "Chest, Shoulders, Triceps",
    category: "Upper Body",
    difficulty: "Intermediate",
    calories: "7-10 per minute",
    benefits: [
      "Strengthens upper body and core",
      "Improves posture and stability",
      "Enhances cardiovascular health",
      "No equipment needed"
    ],
    instructions: [
      "Start in plank position with hands shoulder-width apart",
      "Lower body until chest nearly touches floor",
      "Push back up to starting position",
      "Keep core engaged throughout"
    ],
    tags: ["strength", "bodyweight", "upper-body"]
  },
  {
    name: "Squats",
    animation: "Squats",
    bodyPart: "Legs, Glutes, Core",
    category: "Lower Body",
    difficulty: "Beginner",
    calories: "8-12 per minute",
    benefits: [
      "Builds lower body strength",
      "Improves mobility and balance",
      "Boosts calorie burning",
      "Functional for daily movements"
    ],
    instructions: [
      "Stand with feet shoulder-width apart",
      "Lower hips back and down as if sitting in a chair",
      "Keep chest up and knees behind toes",
      "Press through heels to return to start"
    ],
    tags: ["legs", "functional", "compound"]
  },
  {
    name: "Plank",
    animation: "Plank",
    bodyPart: "Core, Shoulders, Back",
    category: "Core",
    difficulty: "Beginner",
    calories: "3-5 per minute",
    benefits: [
      "Strengthens entire core",
      "Improves posture and balance",
      "Reduces back pain risk",
      "Enhances sports performance"
    ],
    instructions: [
      "Start on forearms and toes",
      "Keep body in straight line from head to heels",
      "Engage core and glutes",
      "Hold for desired time"
    ],
    tags: ["core", "isometric", "stability"]
  },
  {
    name: "Bicep Curls",
    animation: "Bicep Curls",
    bodyPart: "Arms (Biceps)",
    category: "Upper Body",
    difficulty: "Beginner",
    calories: "5-8 per minute",
    benefits: [
      "Strengthens biceps muscles",
      "Improves arm definition",
      "Enhances pulling strength",
      "Can be done with various equipment"
    ],
    instructions: [
      "Stand with dumbbells at sides, palms forward",
      "Curl weights toward shoulders",
      "Keep elbows close to torso",
      "Slowly lower back to starting position"
    ],
    tags: ["arms", "strength", "isolation"]
  },
  {
    name: "Shoulder Press",
    animation: "Shoulder Press",
    bodyPart: "Shoulders, Triceps",
    category: "Upper Body",
    difficulty: "Intermediate",
    calories: "6-9 per minute",
    benefits: [
      "Builds shoulder strength and size",
      "Improves overhead mobility",
      "Engages core for stability",
      "Functional for daily lifting"
    ],
    instructions: [
      "Start with weights at shoulder height",
      "Press weights overhead until arms are straight",
      "Lower back to shoulder height with control",
      "Keep core engaged throughout"
    ],
    tags: ["shoulders", "pushing", "compound"]
  },
  {
    name: "Rope Skipping",
    animation: "Rope Skipping",
    bodyPart: "Full Body",
    category: "Cardio",
    difficulty: "Intermediate",
    calories: "10-15 per minute",
    benefits: [
      "Excellent cardiovascular exercise",
      "Improves coordination and footwork",
      "Burns calories efficiently",
      "Portable and inexpensive equipment"
    ],
    instructions: [
      "Hold rope handles with elbows close to sides",
      "Jump just high enough to clear the rope",
      "Use wrists to turn the rope, not arms",
      "Land softly on balls of feet"
    ],
    tags: ["cardio", "coordination", "endurance"]
  },
  {
    name: "Crunches",
    animation: "Crunches",
    bodyPart: "Abs",
    category: "Core",
    difficulty: "Beginner",
    calories: "4-6 per minute",
    benefits: [
      "Targets rectus abdominis",
      "Improves core endurance",
      "Can be done anywhere",
      "Low impact exercise"
    ],
    instructions: [
      "Lie on back with knees bent and feet flat",
      "Place hands behind head or across chest",
      "Lift shoulder blades off floor by contracting abs",
      "Lower back down with control"
    ],
    tags: ["abs", "beginner", "isolation"]
  },
  {
    name: "Burpee",
    animation: "Burpee",
    bodyPart: "Full Body",
    category: "Cardio",
    difficulty: "Advanced",
    calories: "10-14 per minute",
    benefits: [
      "Full body conditioning",
      "High calorie burn",
      "Improves explosive power",
      "No equipment needed"
    ],
    instructions: [
      "Start standing, then drop into squat position",
      "Kick feet back to plank position",
      "Do a push-up (optional)",
      "Jump feet back to hands and explode upward"
    ],
    tags: ["cardio", "full-body", "plyometric"]
  },
  {
    name: "High Knees",
    animation: "High Knees",
    bodyPart: "Legs, Core",
    category: "Cardio",
    difficulty: "Beginner",
    calories: "8-12 per minute",
    benefits: [
      "Elevates heart rate quickly",
      "Improves running form",
      "Engages core muscles",
      "Good warm-up exercise"
    ],
    instructions: [
      "Stand tall with feet hip-width apart",
      "Drive knees up to waist level",
      "Pump arms opposite to legs",
      "Land softly on balls of feet"
    ],
    tags: ["cardio", "warm-up", "coordination"]
  },
  {
    name: "Lunges",
    animation: "Lunges",
    bodyPart: "Legs, Glutes",
    category: "Lower Body",
    difficulty: "Beginner",
    calories: "7-10 per minute",
    benefits: [
      "Builds single-leg strength",
      "Improves balance and stability",
      "Targets glutes effectively",
      "Functional movement pattern"
    ],
    instructions: [
      "Stand tall, step forward with one leg",
      "Lower hips until both knees form 90-degree angles",
      "Push through front heel to return to start",
      "Keep torso upright throughout"
    ],
    tags: ["legs", "unilateral", "functional"]
  },
  {
    name: "Tricep Dips",
    animation: "Tricep Dips",
    bodyPart: "Arms (Triceps)",
    category: "Upper Body",
    difficulty: "Intermediate",
    calories: "5-8 per minute",
    benefits: [
      "Targets triceps effectively",
      "Can be done on bench or bars",
      "Improves pushing strength",
      "Engages shoulder stabilizers"
    ],
    instructions: [
      "Place hands on bench behind you, fingers forward",
      "Lower body by bending elbows to 90 degrees",
      "Keep elbows pointing backward",
      "Press back up to starting position"
    ],
    tags: ["arms", "bodyweight", "pushing"]
  },
  {
    name: "Glute Bridge",
    animation: "Glute Bridge",
    bodyPart: "Glutes, Hamstrings",
    category: "Lower Body",
    difficulty: "Beginner",
    calories: "5-7 per minute",
    benefits: [
      "Activates glute muscles",
      "Improves hip extension",
      "Can help alleviate back pain",
      "Good for posterior chain"
    ],
    instructions: [
      "Lie on back with knees bent, feet flat",
      "Lift hips up by squeezing glutes",
      "Form straight line from shoulders to knees",
      "Lower back down with control"
    ],
    tags: ["glutes", "rehabilitation", "isolation"]
  },
  {
    name: "Yoga Flow",
    animation: "Yoga Flow",
    bodyPart: "Full Body",
    category: "Flexibility",
    difficulty: "Beginner",
    calories: "3-5 per minute",
    benefits: [
      "Improves flexibility and mobility",
      "Reduces stress and tension",
      "Enhances mind-body connection",
      "Can be adapted to all levels"
    ],
    instructions: [
      "Start in mountain pose (standing tall)",
      "Flow through sun salutation sequence",
      "Focus on breath with each movement",
      "Modify poses as needed"
    ],
    tags: ["flexibility", "mindfulness", "low-impact"]
  },
  {
    name: "Dynamic Stretching",
    animation: "Dynamic Stretching",
    bodyPart: "Full Body",
    category: "Flexibility",
    difficulty: "Beginner",
    calories: "3-5 per minute",
    benefits: [
      "Improves range of motion",
      "Prepares body for activity",
      "Reduces injury risk",
      "Enhances blood flow"
    ],
    instructions: [
      "Perform controlled movements through full range",
      "Include leg swings, arm circles, torso twists",
      "Move smoothly without bouncing",
      "Focus on major muscle groups"
    ],
    tags: ["warm-up", "mobility", "recovery"]
  },
  {
    name: "Side Crunches",
    animation: "Side Crunches",
    bodyPart: "Obliques",
    category: "Core",
    difficulty: "Beginner",
    calories: "4-6 per minute",
    benefits: [
      "Targets oblique muscles",
      "Improves rotational strength",
      "Enhances core definition",
      "Can be done without equipment"
    ],
    instructions: [
      "Lie on side with legs stacked",
      "Place hand behind head",
      "Lift shoulder toward hip by contracting obliques",
      "Lower back down with control"
    ],
    tags: ["obliques", "isolation", "beginner"]
  },
  // Add all other exercises from your animation map
  {
    name: "Plank Twists",
    animation: "Plank Twists",
    bodyPart: "Core, Shoulders",
    category: "Core",
    difficulty: "Intermediate",
    calories: "5-8 per minute",
    benefits: [
      "Engages entire core",
      "Improves rotational stability",
      "Works shoulders isometrically",
      "Challenges balance"
    ],
    instructions: [
      "Start in high plank position",
      "Rotate torso to bring one arm up toward ceiling",
      "Keep hips as still as possible",
      "Return to plank and alternate sides"
    ],
    tags: ["core", "rotation", "stability"]
  },
  {
    name: "Fish Squats",
    animation: "Fish Squats",
    bodyPart: "Legs, Glutes",
    category: "Lower Body",
    difficulty: "Intermediate",
    calories: "8-12 per minute",
    benefits: [
      "Targets inner thighs",
      "Improves squat depth",
      "Enhances hip mobility",
      "Builds lower body endurance"
    ],
    instructions: [
      "Stand with feet wider than shoulder-width",
      "Point toes outward at 45 degrees",
      "Lower into squat while keeping knees aligned",
      "Press through heels to return to start"
    ],
    tags: ["legs", "squat-variation", "mobility"]
  },
  {
    name: "Pull Rope",
    animation: "Pull Rope",
    bodyPart: "Back, Arms",
    category: "Upper Body",
    difficulty: "Intermediate",
    calories: "7-10 per minute",
    benefits: [
      "Builds back and arm strength",
      "Improves grip strength",
      "Simulates climbing motion",
      "Good for functional fitness"
    ],
    instructions: [
      "Stand facing rope with feet shoulder-width",
      "Alternate pulling rope down hand over hand",
      "Keep core engaged throughout",
      "Control rope on the way up"
    ],
    tags: ["back", "functional", "endurance"]
  },
  {
    name: "Alternate Crunches",
    animation: "Alternate Crunches",
    bodyPart: "Abs",
    category: "Core",
    difficulty: "Beginner",
    calories: "4-6 per minute",
    benefits: [
      "Targets entire abdominal wall",
      "Improves coordination",
      "Low impact exercise",
      "Can be done anywhere"
    ],
    instructions: [
      "Lie on back with knees bent",
      "Place hands behind head lightly",
      "Alternate bringing opposite elbow to knee",
      "Keep lower back pressed to floor"
    ],
    tags: ["abs", "beginner", "coordination"]
  },
  {
    name: "Weight Lifting",
    animation: "Weight Lifting",
    bodyPart: "Full Body",
    category: "Full Body",
    difficulty: "Advanced",
    calories: "8-12 per minute",
    benefits: [
      "Builds full body strength",
      "Increases muscle mass",
      "Boosts metabolism",
      "Improves bone density"
    ],
    instructions: [
      "Use proper form for each lift",
      "Start with lighter weights to learn technique",
      "Control the weight throughout",
      "Progress gradually in weight"
    ],
    tags: ["strength", "compound", "progressive"]
  },
  {
    name: "Squats Twists",
    animation: "Squats Twists",
    bodyPart: "Legs, Core",
    category: "Full Body",
    difficulty: "Intermediate",
    calories: "8-12 per minute",
    benefits: [
      "Combines squat with rotation",
      "Works legs and obliques",
      "Improves mobility",
      "Enhances coordination"
    ],
    instructions: [
      "Perform standard squat",
      "At top of movement, rotate torso to one side",
      "Return to center and squat again",
      "Alternate twisting sides"
    ],
    tags: ["compound", "rotation", "functional"]
  },
  {
    name: "Middle Abs",
    animation: "Middle Abs",
    bodyPart: "Abs",
    category: "Core",
    difficulty: "Intermediate",
    calories: "5-7 per minute",
    benefits: [
      "Targets rectus abdominis",
      "Improves core definition",
      "Enhances trunk flexion",
      "Can be progressed easily"
    ],
    instructions: [
      "Lie on back with legs raised",
      "Place hands behind head lightly",
      "Curl upper body toward knees",
      "Lower back down with control"
    ],
    tags: ["abs", "intermediate", "isolation"]
  },
  {
    name: "Rope Jump",
    animation: "Rope Jump",
    bodyPart: "Full Body",
    category: "Cardio",
    difficulty: "Intermediate",
    calories: "10-15 per minute",
    benefits: [
      "Excellent cardio workout",
      "Improves coordination",
      "Burns calories efficiently",
      "Portable equipment"
    ],
    instructions: [
      "Hold rope handles at sides",
      "Jump with both feet together",
      "Use wrists to turn the rope",
      "Land softly on balls of feet"
    ],
    tags: ["cardio", "coordination", "endurance"]
  },
  {
    name: "Biceps",
    animation: "Biceps",
    bodyPart: "Arms",
    category: "Upper Body",
    difficulty: "Beginner",
    calories: "5-8 per minute",
    benefits: [
      "Isolates biceps muscles",
      "Improves arm definition",
      "Enhances pulling strength",
      "Various equipment options"
    ],
    instructions: [
      "Stand with weights at sides",
      "Curl weights up toward shoulders",
      "Keep elbows stationary",
      "Lower back down with control"
    ],
    tags: ["arms", "isolation", "strength"]
  },
  {
    name: "Back Lats",
    animation: "Back Lats",
    bodyPart: "Back",
    category: "Upper Body",
    difficulty: "Intermediate",
    calories: "6-9 per minute",
    benefits: [
      "Targets latissimus dorsi",
      "Improves posture",
      "Enhances pulling strength",
      "Creates V-taper physique"
    ],
    instructions: [
      "Grab bar with wide overhand grip",
      "Pull chest toward bar",
      "Engage back muscles",
      "Lower with control"
    ],
    tags: ["back", "pulling", "compound"]
  },
  {
    name: "Leg Raise Squats",
    animation: "Leg Raise Squats",
    bodyPart: "Legs, Core",
    category: "Full Body",
    difficulty: "Intermediate",
    calories: "8-12 per minute",
    benefits: [
      "Combines squat with balance",
      "Works legs and core",
      "Improves coordination",
      "Challenges stability"
    ],
    instructions: [
      "Stand on one leg",
      "Perform squat while keeping balance",
      "Raise other leg forward",
      "Return to start and alternate"
    ],
    tags: ["balance", "unilateral", "functional"]
  },
  {
    name: "Jump Squats",
    animation: "Jump Squats",
    bodyPart: "Legs, Glutes",
    category: "Lower Body",
    difficulty: "Advanced",
    calories: "10-14 per minute",
    benefits: [
      "Plyometric exercise",
      "Builds explosive power",
      "Burns calories efficiently",
      "No equipment needed"
    ],
    instructions: [
      "Perform standard squat",
      "Explode upward into jump",
      "Land softly and immediately squat again",
      "Keep chest up throughout"
    ],
    tags: ["plyometric", "explosive", "cardio"]
  },
  {
    name: "Push Ups",
    animation: "Push Ups",
    bodyPart: "Chest, Shoulders, Triceps",
    category: "Upper Body",
    difficulty: "Beginner",
    calories: "7-10 per minute",
    benefits: [
      "Classic upper body exercise",
      "Can be modified for all levels",
      "No equipment needed",
      "Works multiple muscle groups"
    ],
    instructions: [
      "Start in plank position",
      "Lower chest toward floor",
      "Keep body in straight line",
      "Push back up to start"
    ],
    tags: ["chest", "pushing", "bodyweight"]
  },
  {
    name: "Step Ups",
    animation: "Step Ups",
    bodyPart: "Legs, Glutes",
    category: "Lower Body",
    difficulty: "Beginner",
    calories: "7-10 per minute",
    benefits: [
      "Functional movement",
      "Can be done anywhere",
      "Improves single-leg strength",
      "Low impact option"
    ],
    instructions: [
      "Stand facing bench or step",
      "Step up with one foot",
      "Bring other foot to meet it",
      "Step back down and alternate"
    ],
    tags: ["functional", "unilateral", "beginner"]
  },
  {
    name: "Twist Plank",
    animation: "Twist Plank",
    bodyPart: "Core, Shoulders",
    category: "Core",
    difficulty: "Intermediate",
    calories: "5-8 per minute",
    benefits: [
      "Targets obliques",
      "Improves rotational stability",
      "Challenges shoulder endurance",
      "Engages entire core"
    ],
    instructions: [
      "Start in forearm plank",
      "Rotate hips to one side",
      "Return to center",
      "Alternate sides"
    ],
    tags: ["core", "rotation", "stability"]
  },
  {
    name: "Body Core",
    animation: "Body Core",
    bodyPart: "Core",
    category: "Core",
    difficulty: "Intermediate",
    calories: "5-8 per minute",
    benefits: [
      "Comprehensive core workout",
      "Improves posture",
      "Enhances athletic performance",
      "Reduces back pain risk"
    ],
    instructions: [
      "Engage all core muscles",
      "Maintain proper alignment",
      "Breathe steadily",
      "Progress gradually"
    ],
    tags: ["core", "stability", "foundation"]
  },
  {
    name: "Lower Abdominal",
    animation: "Lower Abdominal",
    bodyPart: "Abs",
    category: "Core",
    difficulty: "Intermediate",
    calories: "5-7 per minute",
    benefits: [
      "Targets lower abs",
      "Improves core definition",
      "Enhances hip flexor control",
      "Can be progressed"
    ],
    instructions: [
      "Lie on back with legs raised",
      "Lower legs toward floor",
      "Stop before arching back",
      "Return to start position"
    ],
    tags: ["abs", "isolation", "intermediate"]
  },
  {
    name: "Half Pushups",
    animation: "Half Pushups",
    bodyPart: "Chest, Shoulders",
    category: "Upper Body",
    difficulty: "Beginner",
    calories: "5-8 per minute",
    benefits: [
      "Easier pushup variation",
      "Builds foundational strength",
      "Good for beginners",
      "Progress to full pushups"
    ],
    instructions: [
      "Start with knees on floor",
      "Keep body straight from knees to shoulders",
      "Lower chest toward floor",
      "Push back up"
    ],
    tags: ["beginner", "modified", "pushing"]
  },
  {
    name: "Stretch Jump",
    animation: "Stretch Jump",
    bodyPart: "Full Body",
    category: "Cardio",
    difficulty: "Beginner",
    calories: "8-12 per minute",
    benefits: [
      "Good warm-up exercise",
      "Elevates heart rate",
      "Improves coordination",
      "Loosens up joints"
    ],
    instructions: [
      "Stand with feet together",
      "Jump while spreading legs and raising arms",
      "Land softly and repeat",
      "Move continuously"
    ],
    tags: ["warm-up", "cardio", "coordination"]
  }
];

// Body part categories
const categories = [
  { name: "All", icon: <AccessibilityNew /> },
  { name: "Upper Body", icon: <FitnessCenter /> },
  { name: "Lower Body", icon: <DirectionsRun /> },
  { name: "Core", icon: <Whatshot /> },
  { name: "Cardio", icon: <DirectionsRun /> },
  { name: "Flexibility", icon: <Spa /> },
  { name: "Full Body", icon: <AccessibilityNew /> }
];

const WorkoutExplorer = () => {
  const theme = useTheme();
  const [selectedTab, setSelectedTab] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const toggleFavorite = (exerciseName) => {
    if (favorites.includes(exerciseName)) {
      setFavorites(favorites.filter(f => f !== exerciseName));
    } else {
      setFavorites([...favorites, exerciseName]);
    }
  };

  const handleExerciseClick = (exercise) => {
    setSelectedExercise(exercise);
    setOpenDialog(true);
  };

  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || 
      exercise.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: 'background.default',
      pb: 8
    }}>
      {/* Hero Section */}
      <Box sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
        color: 'white',
        py: 8,
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
              <FitnessCenter sx={{ fontSize: 48, verticalAlign: 'middle', mr: 2 }} />
              MotionFit Pro
            </Typography>
            <Typography variant="h5" sx={{ mb: 4 }}>
              Interactive 3D Workout Library with Animated Guides
            </Typography>
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
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                style={{
                  position: 'absolute',
                  background: 'rgba(255,255,255,0.15)',
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
                  opacity: [0, 0.2, 0],
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

      {/* Category Filter */}
      <Container maxWidth="lg" sx={{ mt: -5, mb: 4 }}>
        <Paper elevation={4} sx={{ 
          borderRadius: 3,
          p: 2,
          bgcolor: 'background.paper'
        }}>
          <Box sx={{ 
            display: 'flex', 
            overflowX: 'auto',
            py: 1,
            '&::-webkit-scrollbar': { display: 'none' },
            mt: 5
          }}>
            {categories.map((category, index) => (
              <Button
                key={index}
                startIcon={category.icon}
                variant={selectedCategory === category.name ? "contained" : "outlined"}
                onClick={() => setSelectedCategory(category.name)}
                sx={{
                  borderRadius: 5,
                  mx: 1,
                  whiteSpace: 'nowrap',
                  minWidth: 'max-content'
                }}
              >
                {category.name}
              </Button>
            ))}
          </Box>
        </Paper>
      </Container>

      {/* Search and Filter */}
      <Container maxWidth="md" sx={{ mb: 4 }}>
        <TextField
          fullWidth
          placeholder="Search exercises..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <FilterList sx={{ mr: 1, color: 'action.active' }} />
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 3,
              bgcolor: 'background.paper'
            }
          }}
        />
      </Container>

      {/* Exercise Grid */}
      <Container maxWidth="lg">
        {filteredExercises.length === 0 ? (
          <Box sx={{ 
            textAlign: 'center', 
            py: 10,
            bgcolor: 'background.paper',
            borderRadius: 3,
            boxShadow: 1
          }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              No exercises found
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Try adjusting your search or category filters
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={4}>
            {filteredExercises.map((exercise, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    borderRadius: 3,
                    boxShadow: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: 6
                    }
                  }}>
                    {/* Exercise Animation */}
                    <Box sx={{ 
                      height: 200,
                      position: 'relative',
                      bgcolor: 'background.default',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                      <Lottie
                        options={{
                          loop: true,
                          autoplay: true,
                          animationData: animationMap[exercise.animation],
                          rendererSettings: {
                            preserveAspectRatio: 'xMidYMid slice'
                          }
                        }}
                        height="100%"
                        width="100%"
                        style={{ padding: 16 }}
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
                        onClick={() => toggleFavorite(exercise.name)}
                      >
                        <Favorite 
                          sx={{ 
                            color: favorites.includes(exercise.name) ? 
                              theme.palette.error.main : 
                              theme.palette.grey[400]
                          }} 
                        />
                      </IconButton>
                    </Box>

                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="div">
                        {exercise.name}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Chip 
                          label={exercise.difficulty} 
                          size="small" 
                          color="primary"
                          sx={{ mr: 1 }} 
                        />
                        <Chip 
                          label={exercise.calories} 
                          size="small" 
                          variant="outlined"
                          icon={<Whatshot sx={{ fontSize: 16 }} />}
                        />
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        <strong>Targets:</strong> {exercise.bodyPart}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        <strong>Category:</strong> {exercise.category}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {exercise.tags.map((tag, i) => (
                          <Chip key={i} label={tag} size="small" variant="outlined" />
                        ))}
                      </Box>
                    </CardContent>
                    
                    <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                      <Button 
                        size="small" 
                      color="primary"
                      sx={{ borderRadius: 5 }}
                      onClick={() => handleExerciseClick(exercise)}
                    >
                      Learn More
                    </Button>
                  </Box>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
        )}
      </Container>

      {/* Exercise Detail Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedExercise && (
          <>
            <DialogTitle sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Typography variant="h4">{selectedExercise.name}</Typography>
              <IconButton onClick={() => toggleFavorite(selectedExercise.name)}>
                <Favorite 
                  color={favorites.includes(selectedExercise.name) ? "error" : "inherit"} 
                />
              </IconButton>
            </DialogTitle>
            
            <DialogContent dividers>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ 
                    height: 300,
                    bgcolor: 'background.default',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 2,
                    overflow: 'hidden'
                  }}>
                    <Lottie
                      options={{
                        loop: true,
                        autoplay: true,
                        animationData: animationMap[selectedExercise.animation],
                        rendererSettings: {
                          preserveAspectRatio: 'xMidYMid slice'
                        }
                      }}
                      height="100%"
                      width="100%"
                    />
                  </Box>
                  
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    mt: 2,
                    mb: 3
                  }}>
                    <Chip 
                      label={`Target: ${selectedExercise.bodyPart}`} 
                      color="primary"
                      icon={<AccessibilityNew />}
                    />
                    <Chip 
                      label={selectedExercise.difficulty} 
                      variant="outlined"
                    />
                    <Chip 
                      label={selectedExercise.calories} 
                      icon={<Whatshot />}
                    />
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    <Whatshot sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Key Benefits
                  </Typography>
                  
                  <Box component="ul" sx={{ pl: 3, mb: 3 }}>
                    {selectedExercise.benefits.map((benefit, i) => (
                      <li key={i}>
                        <Typography variant="body1">{benefit}</Typography>
                      </li>
                    ))}
                  </Box>
                  
                  <Typography variant="h6" gutterBottom>
                    <Timer sx={{ mr: 1, verticalAlign: 'middle' }} />
                    How To Perform
                  </Typography>
                  
                  <Box component="ol" sx={{ pl: 3 }}>
                    {selectedExercise.instructions.map((step, i) => (
                      <li key={i}>
                        <Typography variant="body1">{step}</Typography>
                      </li>
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
            
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Close</Button>
              <Button 
                variant="contained" 
                color="primary"
                startIcon={<DirectionsRun />}
              >
                Start Workout
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Floating Action Button */}
      <Box sx={{ 
        position: 'fixed',
        bottom: 32,
        right: 32,
        zIndex: 1000
      }}>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<FitnessCenter />}
            sx={{
              borderRadius: 5,
              px: 4,
              py: 2,
              fontWeight: 'bold',
              boxShadow: 6
            }}
          >
            My Workout Plan
          </Button>
        </motion.div>
      </Box>
    </Box>
  );
};

export default WorkoutExplorer;