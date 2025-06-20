import { Box, Typography, Card, useTheme } from "@mui/material";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import SchoolIcon from "@mui/icons-material/School";
import PeopleIcon from "@mui/icons-material/People";

function CardGroup() {
  const theme = useTheme();
  const student = localStorage.getItem("student");
  const studentData = student ? JSON.parse(student) : null;

  const cards = [
    {
      icon: <ImportContactsIcon />,
      label: "Enrolled Semester",
      value: studentData?.session || "N/A",
      color: theme.palette.primary.main,
      bgColor: theme.palette.primary.light
    },
    {
      icon: <CreditCardIcon />,
      label: "Outstanding Fees",
      value: "0",
      color: theme.palette.success.main,
      bgColor: theme.palette.success.light
    },
    {
      icon: <SchoolIcon />,
      label: "CGPA",
      value: "3.00",
      color: theme.palette.warning.main,
      bgColor: theme.palette.warning.light
    },
    {
      icon: <PeopleIcon />,
      label: "Class Section",
      value: "D",
      color: theme.palette.info.main,
      bgColor: theme.palette.info.light
    },
  ];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)"
        },
        gap: 3,
      }}
    >
      {cards.map((card, index) => (
        <Card
          key={index}
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            borderRadius: 2,
            backgroundColor: card.bgColor,
            boxShadow: theme.shadows[2],
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow: theme.shadows[4]
            }
          }}
        >
          <Box
            sx={{
              width: 60,
              height: 60,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: theme.palette.background.paper,
              borderRadius: "50%",
              mb: 2,
              boxShadow: 1
            }}
          >
            <Box sx={{ color: card.color }}>{card.icon}</Box>
          </Box>
          
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600,
              color: theme.palette.text.primary,
              mb: 1
            }}
          >
            {card.label}
          </Typography>
          
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 700,
              color: card.color
            }}
          >
            {card.value}
          </Typography>
        </Card>
      ))}
    </Box>
  );
}

export default CardGroup;