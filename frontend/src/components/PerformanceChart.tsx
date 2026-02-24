'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts'

const MotionBox = motion(Box)

const data = [
  { name: 'Response Time', EmailShare: 95, Others: 65, Email: 45 },
  { name: 'Collaboration', EmailShare: 90, Others: 70, Email: 30 },
  { name: 'Search Speed', EmailShare: 98, Others: 60, Email: 40 },
  { name: 'Organization', EmailShare: 92, Others: 55, Email: 35 },
]

export default function PerformanceChart() {
  return (
    <Box py={{ base: 20, md: 32 }} bg="#09090b" position="relative" overflow="hidden">
      <Container maxW="container.xl">
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <VStack spacing={4} textAlign="center" mb={16}>
            <Text
              color="brand.400"
              fontWeight="bold"
              textTransform="uppercase"
              letterSpacing="wider"
              fontSize="sm"
            >
              Performance Metrics
            </Text>
            <Heading size="2xl" color="white" maxW="3xl">
              EmailShare vs Traditional Solutions
            </Heading>
            <Text fontSize="lg" color="whiteAlpha.700" maxW="2xl">
              See the measurable difference in team productivity and efficiency
            </Text>
          </VStack>
        </MotionBox>

        <MotionBox
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          bg="whiteAlpha.50"
          p={{ base: 6, md: 12 }}
          borderRadius="3xl"
          border="1px solid"
          borderColor="whiteAlpha.100"
          backdropFilter="blur(10px)"
          boxShadow="0 20px 60px rgba(0,0,0,0.3)"
        >
          <ResponsiveContainer width="100%" height={500}>
            <BarChart 
              data={data} 
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              barGap={12}
              barCategoryGap="20%"
            >
              <defs>
                <linearGradient id="colorEmailShare" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={1}/>
                  <stop offset="100%" stopColor="#1d4ed8" stopOpacity={1}/>
                </linearGradient>
                <linearGradient id="colorOthers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity={1}/>
                  <stop offset="100%" stopColor="#7e22ce" stopOpacity={1}/>
                </linearGradient>
                <linearGradient id="colorEmail" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6b7280" stopOpacity={1}/>
                  <stop offset="100%" stopColor="#374151" stopOpacity={1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" vertical={false} />
              <XAxis 
                dataKey="name" 
                stroke="rgba(255,255,255,0.5)" 
                tick={{ fill: 'rgba(255,255,255,0.8)', fontSize: 14, fontWeight: 500 }}
                axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.5)" 
                tick={{ fill: 'rgba(255,255,255,0.8)', fontSize: 14 }}
                axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                domain={[0, 100]}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.95)', 
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '16px',
                  color: 'white',
                  padding: '12px 16px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                }}
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
              />
              <Legend 
                wrapperStyle={{ 
                  color: 'white',
                  paddingTop: '20px',
                  fontSize: '14px',
                  fontWeight: 500
                }}
                iconType="circle"
                iconSize={12}
              />
              <Bar 
                dataKey="EmailShare" 
                fill="url(#colorEmailShare)" 
                radius={[12, 12, 0, 0]}
                animationBegin={0}
                animationDuration={1500}
                animationEasing="ease-out"
              />
              <Bar 
                dataKey="Others" 
                fill="url(#colorOthers)" 
                radius={[12, 12, 0, 0]}
                animationBegin={200}
                animationDuration={1500}
                animationEasing="ease-out"
              />
              <Bar 
                dataKey="Email" 
                fill="url(#colorEmail)" 
                radius={[12, 12, 0, 0]}
                animationBegin={400}
                animationDuration={1500}
                animationEasing="ease-out"
              />
            </BarChart>
          </ResponsiveContainer>
        </MotionBox>
      </Container>
    </Box>
  )
}
