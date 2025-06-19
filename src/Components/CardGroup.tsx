import {Box, Typography, Card } from "@mui/material";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import SchoolIcon from "@mui/icons-material/School";
import PeopleIcon from "@mui/icons-material/People";

function CardGroup() {
  const student = localStorage.getItem("student");
  const studentData = student ? JSON.parse(student) : null;
  console.log(studentData);
    const styles={
        cardGroup: {
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              marginTop: "20px",
              justifyContent: "space-between",
            },
            card: {
              flex: "1 1 200px",
              minWidth: "250px",
              backgroundColor: "#ffffff",
              boxShadow: "6px 6px 20px rgb(54, 54, 54)",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "space-between",
              padding: "30px",
            },
    }
  return (
    <Box sx={styles.cardGroup}>
      <Card sx={styles.card} variant="outlined">
        <Box>
          <ImportContactsIcon sx={{ color: "#DC3545", fontSize: "50px" }} />
        </Box>
        <Box>
          <Typography
            variant="h5"
            fontSize={28}
            fontWeight={500}
            color="initial"
            sx={{ color: "#7e7e7e" }}
          >
            Enrolled Semester
          </Typography>
          <Typography
            align="right"
            variant="h6"
            color="textSecondary"
            sx={{ opacity: 0.5 }}
          >
            {studentData ? studentData.session : "N/A"}
          </Typography>
        </Box>
      </Card>
      <Card sx={styles.card} variant="outlined">
        <Box>
          <CreditCardIcon sx={{ color: "#198754", fontSize: "50px" }} />
        </Box>
        <Box>
          <Typography
            variant="h5"
            fontSize={28}
            fontWeight={500}
            color="initial"
            sx={{ color: "#7e7e7e" }}
          >
            Outstanding Fees
          </Typography>
          <Typography
            align="right"
            variant="h6"
            color="textSecondary"
            sx={{ opacity: 0.5 }}
          >
            0
          </Typography>
        </Box>
      </Card>
      <Card sx={styles.card} variant="outlined">
        <Box>
          <SchoolIcon sx={{ color: "#888", fontSize: "50px" }} />
        </Box>
        <Box>
          <Typography
            variant="h5"
            fontSize={28}
            fontWeight={500}
            color="initial"
            sx={{ color: "#7e7e7e" }}
          >
            CGPA
          </Typography>
          <Typography
            align="right"
            variant="h6"
            color="textSecondary"
            sx={{ opacity: 0.5 }}
          >
            3.00
          </Typography>
        </Box>
      </Card>
      <Card sx={styles.card} variant="outlined">
        <Box>
          <PeopleIcon sx={{ fontSize: "50px" }} />
        </Box>
        <Box>
          <Typography
            variant="h5"
            fontSize={28}
            fontWeight={500}
            color="initial"
            sx={{ color: "#7e7e7e" }}
          >
            Class Section
          </Typography>
          <Typography
            align="right"
            variant="h6"
            color="textSecondary"
            sx={{ opacity: 0.5 }}
          >
            D
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}

export default CardGroup;
