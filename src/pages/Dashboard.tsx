// // components/Dashboard.tsx (updated)
// import React from 'react';
// import { Layout } from './layout/Layout';
// import { PageContainer } from './layout/PageContainer';
// import { Section } from '../components/layout/Section';

// // Mock auth service - replace with your actual auth
// const mockAuthService = {
//   getCurrentUser: async () => ({
//     name: 'User Name',
//     email: 'user@example.com'
//   })
// };

// const Dashboard: React.FC = () => {
//   return (
//     <Layout getCurrentUser={getCurrentUser}>
//       <PageContainer>
//         <Section title="Dashboard">
//           <div className="text-center py-12">
//             <h1 className="text-3xl font-bold text-gray-800 mb-4">
//               Welcome to Your Dashboard
//             </h1>
//             <p className="text-gray-600">
//               This is your main dashboard. Use the sidebar to navigate to different sections.
//             </p>
//           </div>
//         </Section>
//       </PageContainer>
//     </Layout>
//   );
// };

// export default Dashboard;