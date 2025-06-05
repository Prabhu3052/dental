  // Chart Configuration
  const chartConfigs = {
    overviewChart: {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'New Patients',
          data: [120, 150, 180, 210, 240, 280],
          borderColor: '#4e73df',
          backgroundColor: 'rgba(78, 115, 223, 0.05)',
          fill: true,
          tension: 0.3
        }, {
          label: 'Returning Patients',
          data: [80, 90, 110, 130, 150, 170],
          borderColor: '#1cc88a',
          backgroundColor: 'rgba(28, 200, 138, 0.05)',
          fill: true,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          }
        }
      }
    },
    overviewAppointmentsChart: {
      type: 'doughnut',
      data: {
        labels: ['Completed', 'Cancelled', 'Rescheduled', 'No Show'],
        datasets: [{
          data: [100, 50, 10, 6],
          backgroundColor: ['#1cc88a', '#e74a3b', '#f6c23e', '#858796']
        }]
      },
      options: {
        cutout: '30%',
        plugins: {
          legend: {
            position: 'right'
          }
        }
      }
    },
    genderChart: {
      type: 'pie',
      data: {
        labels: ['Male', 'Female', 'Other'],
        datasets: [{
          data: [45, 52, 3],
          backgroundColor: ['#36b9cc', '#1cc88a', '#f6c23e']
        }]
      },
      options: {
        cutout: '30%',
        plugins: {
          legend: {
            position: 'right'
          }
        }
      }
    },
    ageGroupChart: {
      type: 'bar',
      data: {
        labels: ['0-18', '19-35', '36-50', '51+'],
        datasets: [{
          label: 'Patients',
          data: [120, 580, 320, 228],
          backgroundColor: '#4e73df'
        }]
      },
      options: {
        indexAxis: 'y',
        plugins: {
          legend: {
            display: false
          }
        }
      }
    },
    newPatientsChart: {
      type: 'line',
      data: {
        labels: Array.from({length: 30}, (_, i) => i+1),
        datasets: [{
          label: 'New Patients',
          data: Array.from({length: 30}, () => Math.floor(Math.random() * 10) + 2),
          borderColor: '#4e73df',
          backgroundColor: 'rgba(78, 115, 223, 0.05)',
          fill: true,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Day of Month'
            }
          },
          y: {
            title: {
              display: true,
              text: 'New Patients'
            }
          }
        }
      }
    },
    appointmentTrendsChart: {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        datasets: [{
          label: 'Appointments',
          data: [18, 22, 19, 25, 21, 12],
          borderColor: '#4e73df',
          backgroundColor: 'rgba(78, 115, 223, 0.05)',
          fill: true
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        }
      }
    },
    appointmentStatusChart: {
      type: 'pie',
      data: {
        labels: ['Completed', 'Cancelled', 'Rescheduled'],
        datasets: [{
          data: [72, 15, 13],
          backgroundColor: ['#1cc88a', '#e74a3b', '#f6c23e']
        }]
      },
      options: {
        plugins: {
          legend: {
            position: 'right'
          }
        }
      }
    },
    treatmentTypeChart: {
      type: 'doughnut',
      data: {
        labels: ['Preventive', 'Restorative', 'Cosmetic', 'Surgical'],
        datasets: [{
          data: [35, 40, 15, 10],
          backgroundColor: ['#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b']
        }]
      },
      options: {
        plugins: {
          legend: {
            position: 'right'
          }
        }
      }
    },
    commonTreatmentsChart: {
      type: 'bar',
      data: {
        labels: ['Cleaning', 'Filling', 'Extraction', 'Whitening', 'Checkup'],
        datasets: [{
          label: 'Procedures',
          data: [320, 280, 150, 90, 400],
          backgroundColor: '#4e73df'
        }]
      },
      options: {
        indexAxis: 'y',
        plugins: {
          legend: {
            display: false
          }
        }
      }
    },
    treatmentAgeChart: {
      type: 'bar',
      data: {
        labels: ['0-18', '19-35', '36-50', '51+'],
        datasets: [
          {
            label: 'Preventive',
            data: [65, 40, 30, 45],
            backgroundColor: '#1cc88a'
          },
          {
            label: 'Restorative',
            data: [30, 45, 50, 60],
            backgroundColor: '#36b9cc'
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            position: 'top'
          }
        }
      }
    },
    treatmentRevenueChart: {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Preventive',
            data: [2500, 2800, 3200, 2900, 3100, 3500],
            backgroundColor: '#1cc88a'
          },
          {
            label: 'Restorative',
            data: [4200, 4500, 4800, 5100, 5400, 5800],
            backgroundColor: '#36b9cc'
          },
          {
            label: 'Cosmetic',
            data: [1800, 2000, 2200, 2500, 2700, 3000],
            backgroundColor: '#f6c23e'
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          }
        },
        scales: {
          x: {
            stacked: true
          },
          y: {
            stacked: true
          }
        }
      }
    },
    dentistAppointmentsChart: {
      type: 'bar',
      data: {
        labels: ['Dr. Smith', 'Dr. Lee', 'Dr. Patel', 'Dr. Garcia'],
        datasets: [{
          label: 'This Month',
          data: [42, 38, 35, 28],
          backgroundColor: '#1cc88a'
        }, {
          label: 'Last Month',
          data: [38, 35, 32, 25],
          backgroundColor: '#36b9cc'
        }]
      },
      options: {
        plugins: {
          legend: {
            position: 'top'
          }
        }
      }
    },
    dentistRatingsChart: {
      type: 'radar',
      data: {
        labels: ['Expertise', 'Bedside Manner', 'Punctuality', 'Communication', 'Facility'],
        datasets: [
          {
            label: 'Dr. Smith',
            data: [4.8, 4.5, 4.2, 4.7, 4.3],
            borderColor: '#4e73df',
            backgroundColor: 'rgba(78, 115, 223, 0.1)'
          },
          {
            label: 'Dr. Lee',
            data: [4.6, 4.8, 4.5, 4.6, 4.4],
            borderColor: '#1cc88a',
            backgroundColor: 'rgba(28, 200, 138, 0.1)'
          }
        ]
      },
      options: {
        scales: {
          r: {
            angleLines: { display: true },
            suggestedMin: 0,
            suggestedMax: 5
          }
        }
      }
    },
    dentistAvailabilityChart: {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        datasets: [
          {
            label: 'Dr. Smith',
            data: [8, 8, 6, 8, 6, 4],
            backgroundColor: '#4e73df'
          },
          {
            label: 'Dr. Lee',
            data: [6, 8, 8, 6, 8, 4],
            backgroundColor: '#1cc88a'
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            position: 'top'
          }
        },
        scales: {
          y: {
            title: {
              display: true,
              text: 'Hours Available'
            }
          }
        }
      }
    },
    billingTypeChart:{
       type: 'pie',
  data: {
    labels: ['Insurance', 'Cash', 'Online Payment'],
    datasets: [{
      data: [45, 30, 25],
      backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  }
    },
    monthlyBillingChart:{
       type: 'bar',
  data: {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{
      label: 'Billing (in ₹)',
      data: [12000, 15000, 10000, 17000],
      backgroundColor: '#4e73df'
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    },
    responsive: true
  }
    }
  };

  // Initialize all charts
  document.addEventListener('DOMContentLoaded', function() {
    for (const [chartId, config] of Object.entries(chartConfigs)) {
      const ctx = document.getElementById(chartId);
      if (ctx) new Chart(ctx, config);
    }
  });


  function showDashboardTab(tabName, event) {
    document.querySelectorAll('.dashboard-tab-content').forEach(div => div.classList.add('d-none'));
    document.querySelector('#tab-' + tabName).classList.remove('d-none');
    document.querySelectorAll('#dashboardTabs .nav-link').forEach(link => link.classList.remove('active'));
    event.target.classList.add('active');
  }