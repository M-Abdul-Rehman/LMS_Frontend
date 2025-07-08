import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  useTheme,
  Avatar,
} from '@mui/material';
import {
  People,
  School,
  Assignment,
  TrendingUp,
} from '@mui/icons-material';

const AdminStatsCards: React.FC = () => {
  const theme = useTheme();

  const stats = [
    {
      title: 'Total Students',
      value: '1,234',
      change: '+12%',
      icon: <People />,
      color: theme.palette.primary.main,
      bgColor: theme.palette.primary.light,
    },
    {
      title: 'Active Courses',
      value: '89',
      change: '+5%',
      icon: <School />,
      color: theme.palette.secondary.main,
      bgColor: theme.palette.secondary.light,
    },
    {
      title: 'Enrollments',
      value: '2,456',
      change: '+18%',
      icon: <Assignment />,
      color: theme.palette.success.main,
      bgColor: theme.palette.success.light,
    },
    {
      title: 'Average GPA',
      value: '3.42',
      change: '+0.15',
      icon: <TrendingUp />,
      color: theme.palette.warning.main,
      bgColor: theme.palette.warning.light,
    },
  ];

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)',
        },
        gap: 3,
      }}
    >
      {stats.map((stat, index) => (
        <Card
          key={index}
          sx={{
            borderRadius: 2,
            boxShadow: theme.shadows[2],
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: theme.shadows[4],
            },
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar
                sx={{
                  backgroundColor: stat.bgColor,
                  color: stat.color,
                  width: 56,
                  height: 56,
                  mr: 2,
                }}
              >
                {stat.icon}
              </Avatar>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                  {stat.value}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.success.main,
                    fontWeight: 600,
                  }}
                >
                  {stat.change} from last month
                </Typography>
              </Box>
            </Box>
            <Typography
              variant="subtitle1"
              sx={{
                color: theme.palette.text.secondary,
                fontWeight: 500,
              }}
            >
              {stat.title}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default AdminStatsCards;