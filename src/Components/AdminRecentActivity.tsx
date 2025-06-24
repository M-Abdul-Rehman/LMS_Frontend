import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Chip,
  useTheme,
  Box,
} from '@mui/material';
import {
  PersonAdd,
  School,
  Assignment,
  Notifications,
} from '@mui/icons-material';

const AdminRecentActivity: React.FC = () => {
  const theme = useTheme();

  const activities = [
    {
      id: 1,
      type: 'student',
      title: 'New Student Registered',
      description: 'John Doe (CS-2024-001)',
      time: '2 hours ago',
      icon: <PersonAdd />,
      color: theme.palette.primary.main,
    },
    {
      id: 2,
      type: 'course',
      title: 'Course Updated',
      description: 'Data Structures - Syllabus modified',
      time: '4 hours ago',
      icon: <School />,
      color: theme.palette.secondary.main,
    },
    {
      id: 3,
      type: 'enrollment',
      title: 'Bulk Enrollment',
      description: '25 students enrolled in CS101',
      time: '6 hours ago',
      icon: <Assignment />,
      color: theme.palette.success.main,
    },
    {
      id: 4,
      type: 'system',
      title: 'System Maintenance',
      description: 'Scheduled backup completed',
      time: '1 day ago',
      icon: <Notifications />,
      color: theme.palette.warning.main,
    },
  ];

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          Recent Activity
        </Typography>
        <List sx={{ p: 0 }}>
          {activities.map((activity) => (
            <ListItem key={activity.id} sx={{ px: 0, py: 1 }}>
              <ListItemAvatar>
                <Avatar sx={{ backgroundColor: activity.color, width: 40, height: 40 }}>
                  {activity.icon}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {activity.title}
                  </Typography>
                }
                secondary={
                  <Box>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      {activity.description}
                    </Typography>
                    <Chip
                      label={activity.time}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: '0.75rem' }}
                    />
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default AdminRecentActivity;