import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AdmissionPage from './pages/AdmissionPage';
import EnglishCoursesPage from './pages/EnglishCoursesPage';
import EnglishPoliciesPage from './pages/EnglishPoliciesPage';
import HigherEducationPage from './pages/HigherEducationPage';
import FurtherEducationPage from './pages/FurtherEducationPage';
import AboutPage from './pages/AboutPage';
import PoliciesPage from './pages/PoliciesPage';
import ApplyPage from './pages/ApplyPage';
import ContactPage from './pages/ContactPage';
import MissionValuesPage from './pages/MissionValuesPage';
import StudyCentresPage from './pages/StudyCentresPage';
import BTECHNDPage from './pages/BTECHNDPage';
import ATHELevel3Page from './pages/ATHELevel3Page';
import NCFEMathsL1Page from './pages/NCFEMathsL1Page';
import NCFEMathsL2Page from './pages/NCFEMathsL2Page';
import SIADoorSupervisorsPage from './pages/SIADoorSupervisorsPage';
import DigitalSkillsPage from './pages/DigitalSkillsPage';
import ATHELevel4Page from './pages/ATHELevel4Page';
import ATHELevel5Page from './pages/ATHELevel5Page';
import ApprovalsPage from './pages/ApprovalsPage';
import AwardingOrganisationsPage from './pages/AwardingOrganisationsPage';
import AccreditationsPage from './pages/AccreditationsPage';
import ApprovedSupplierStatusPage from './pages/ApprovedSupplierStatusPage';
import CareersPage from './pages/CareersPage';
import CarbonReductionPage from './pages/CarbonReductionPage';
import StudentLifePage from './pages/StudentLifePage';
import StrategicPlanPage from './pages/StrategicPlanPage';
import MembershipsPage from './pages/MembershipsPage';
import NewsEventsPage from './pages/NewsEventsPage';
import MarketingExecutivePage from './pages/MarketingExecutivePage';
import LecturerPage from './pages/LecturerPage';
import AcademicManagerPage from './pages/AcademicManagerPage';
import EducationOfficerPage from './pages/EducationOfficerPage';
import FinancialAccountManagerPage from './pages/FinancialAccountManagerPage';
import TeachingAssistantPage from './pages/TeachingAssistantPage';
import StudentSupportOfficerPage from './pages/StudentSupportOfficerPage';
import DigitalMarketingExecutivePage from './pages/DigitalMarketingExecutivePage';
import OfficeAdminManagerPage from './pages/OfficeAdminManagerPage';
import HumanResourceOfficerPage from './pages/HumanResourceOfficerPage';
import OfficeAdminITAssistantPage from './pages/OfficeAdminITAssistantPage';
import ComplaintPage from './pages/ComplaintPage';
import NewStarterFormPage from './pages/NewStarterFormPage';
import PartnershipsFormPage from './pages/PartnershipsFormPage';
import JobApplicationFormPage from './pages/JobApplicationFormPage';
import EnglishIELTSFormPage from './pages/EnglishIELTSFormPage';
import EnquiryFormPage from './pages/EnquiryFormPage';
import EnrolmentFormPage from './pages/EnrolmentFormPage';
import InternationalApplicationFormPage from './pages/InternationalApplicationFormPage';
import AdminPage from './pages/AdminPage';
import GenericPage from './pages/GenericPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import CookieConsent from './components/CookieConsent';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AppLayout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <ScrollToTop />
        <Routes>
          {/* Home */}
          <Route path="/" element={<HomePage />} />

          {/* Admission */}
          <Route path="/admission" element={<AdmissionPage />} />
          <Route path="/apply" element={<ApplyPage />} />

          {/* English Language Courses */}
          <Route path="/english-language-courses" element={<EnglishCoursesPage />} />
          <Route path="/policies-english" element={<EnglishPoliciesPage />} />

          {/* Higher Education */}
          <Route path="/higher-education" element={<HigherEducationPage />} />
          <Route path="/athe-level-4-5" element={<HigherEducationPage />} />
          <Route path="/athe-level-4" element={<ATHELevel4Page />} />
          <Route path="/athe-level-5" element={<ATHELevel5Page />} />
          <Route path="/btec-hnd" element={<BTECHNDPage />} />

          {/* Further Education */}
          <Route path="/further-education" element={<FurtherEducationPage />} />
          <Route path="/athe-level-3" element={<ATHELevel3Page />} />
          <Route path="/ncfe-maths-l1" element={<NCFEMathsL1Page />} />
          <Route path="/ncfe-maths-l2" element={<NCFEMathsL2Page />} />
          <Route path="/sia-door-supervisors" element={<SIADoorSupervisorsPage />} />
          <Route path="/digital-skills" element={<DigitalSkillsPage />} />

          {/* About */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/mission-values" element={<MissionValuesPage />} />
          <Route path="/study-centres" element={<StudyCentresPage />} />
          <Route path="/student-life" element={<StudentLifePage />} />
          <Route path="/strategic-plan" element={<StrategicPlanPage />} />
          <Route path="/carbon-reduction-plan" element={<CarbonReductionPage />} />
          <Route path="/approvals" element={<ApprovalsPage />} />
          <Route path="/awarding-organisations" element={<AwardingOrganisationsPage />} />
          <Route path="/accreditations" element={<AccreditationsPage />} />
          <Route path="/approved-supplier-status" element={<ApprovedSupplierStatusPage />} />
          <Route path="/memberships" element={<MembershipsPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/marketing-executive" element={<MarketingExecutivePage />} />
          <Route path="/job-lecturer" element={<LecturerPage />} />
          <Route path="/job-academic-manager" element={<AcademicManagerPage />} />
          <Route path="/job-education-officer" element={<EducationOfficerPage />} />
          <Route path="/job-financial-account-manager" element={<FinancialAccountManagerPage />} />
          <Route path="/job-teaching-assistant" element={<TeachingAssistantPage />} />
          <Route path="/job-student-support-officer" element={<StudentSupportOfficerPage />} />
          <Route path="/digital-marketing-executive" element={<DigitalMarketingExecutivePage />} />
          <Route path="/job-office-admin-manager" element={<OfficeAdminManagerPage />} />
          <Route path="/job-human-resource-officer" element={<HumanResourceOfficerPage />} />
          <Route path="/job-office-admin-it-assistant" element={<OfficeAdminITAssistantPage />} />
          <Route path="/news-events" element={<NewsEventsPage />} />
          <Route path="/complaint" element={<ComplaintPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/new-starter-form" element={<NewStarterFormPage />} />
          <Route path="/partnerships-form" element={<PartnershipsFormPage />} />
          <Route path="/application-form" element={<JobApplicationFormPage />} />
          <Route path="/job-application" element={<JobApplicationFormPage />} />
          <Route path="/english-ielts-application" element={<EnglishIELTSFormPage />} />
          <Route path="/enquiry-form" element={<EnquiryFormPage />} />
          <Route path="/enrolment-form" element={<EnrolmentFormPage />} />
          <Route path="/international-application" element={<InternationalApplicationFormPage />} />

          {/* Policies */}
          <Route path="/policies" element={<PoliciesPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />

          {/* 404 */}
          <Route path="*" element={<GenericPage title="Page Not Found" subtitle="The page you're looking for doesn't exist." />} />
        </Routes>
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin — no navbar/footer */}
        <Route path="/admin" element={<AdminPage />} />
        {/* Everything else — with navbar/footer */}
        <Route path="*" element={<AppLayout />} />
      </Routes>
    </BrowserRouter>
  );
}
