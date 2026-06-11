import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/home/HomePage';
import AdmissionPage from './pages/admissions/AdmissionPage';
import ApplyPage from './pages/admissions/ApplyPage';
import EnglishCoursesPage from './pages/courses/english/EnglishCoursesPage';
import EnglishPoliciesPage from './pages/courses/english/EnglishPoliciesPage';
import HigherEducationPage from './pages/courses/higher-education/HigherEducationPage';
import ATHELevel4Page from './pages/courses/higher-education/ATHELevel4Page';
import ATHELevel5Page from './pages/courses/higher-education/ATHELevel5Page';
import BTECHNDPage from './pages/courses/higher-education/BTECHNDPage';
import FurtherEducationPage from './pages/courses/further-education/FurtherEducationPage';
import ATHELevel3Page from './pages/courses/further-education/ATHELevel3Page';
import NCFEMathsL1Page from './pages/courses/further-education/NCFEMathsL1Page';
import NCFEMathsL2Page from './pages/courses/further-education/NCFEMathsL2Page';
import SIADoorSupervisorsPage from './pages/courses/further-education/SIADoorSupervisorsPage';
import DigitalSkillsPage from './pages/courses/further-education/DigitalSkillsPage';
import AboutPage from './pages/about/AboutPage';
import MissionValuesPage from './pages/about/MissionValuesPage';
import StudyCentresPage from './pages/about/StudyCentresPage';
import CarbonReductionPage from './pages/about/CarbonReductionPage';
import StudentLifePage from './pages/about/StudentLifePage';
import StrategicPlanPage from './pages/about/StrategicPlanPage';
import NewsEventsPage from './pages/about/NewsEventsPage';
import CareersPage from './pages/about/CareersPage';
import ApprovalsPage from './pages/approvals/ApprovalsPage';
import AwardingOrganisationsPage from './pages/approvals/AwardingOrganisationsPage';
import AccreditationsPage from './pages/approvals/AccreditationsPage';
import ApprovedSupplierStatusPage from './pages/approvals/ApprovedSupplierStatusPage';
import MembershipsPage from './pages/approvals/MembershipsPage';
import LecturerPage from './pages/jobs/LecturerPage';
import TeachingAssistantPage from './pages/jobs/TeachingAssistantPage';
import StudentSupportOfficerPage from './pages/jobs/StudentSupportOfficerPage';
import OfficeAdminManagerPage from './pages/jobs/OfficeAdminManagerPage';
import OfficeAdminITAssistantPage from './pages/jobs/OfficeAdminITAssistantPage';
import HumanResourceOfficerPage from './pages/jobs/HumanResourceOfficerPage';
import FinancialAccountManagerPage from './pages/jobs/FinancialAccountManagerPage';
import MarketingExecutivePage from './pages/jobs/MarketingExecutivePage';
import DigitalMarketingExecutivePage from './pages/jobs/DigitalMarketingExecutivePage';
import EducationOfficerPage from './pages/jobs/EducationOfficerPage';
import AcademicManagerPage from './pages/jobs/AcademicManagerPage';
import EnquiryFormPage from './pages/forms/EnquiryFormPage';
import EnrolmentFormPage from './pages/forms/EnrolmentFormPage';
import ApplicationFormPage from './pages/forms/ApplicationFormPage';
import JobApplicationFormPage from './pages/forms/JobApplicationFormPage';
import InternationalApplicationFormPage from './pages/forms/InternationalApplicationFormPage';
import EnglishIELTSFormPage from './pages/forms/EnglishIELTSFormPage';
import PartnershipsFormPage from './pages/forms/PartnershipsFormPage';
import NewStarterFormPage from './pages/forms/NewStarterFormPage';
import PoliciesPage from './pages/policies/PoliciesPage';
import PrivacyPolicyPage from './pages/policies/PrivacyPolicyPage';
import ComplaintPage from './pages/policies/ComplaintPage';
import ContactPage from './pages/contact/ContactPage';
import InternationalPage from './pages/international/InternationalPage';
import ApplicationProcessPage from './pages/international/ApplicationProcessPage';
import FeesFundingPage from './pages/international/FeesFundingPage';
import StudentSupportPage from './pages/international/StudentSupportPage';
import OfferChecklistPage from './pages/international/OfferChecklistPage';
import PreArrivalPage from './pages/international/PreArrivalPage';
import PostArrivalPage from './pages/international/PostArrivalPage';
import ThingsToDoPage from './pages/international/ThingsToDoPage';
import EatOutPage from './pages/international/EatOutPage';
import PersonalStatementPage from './pages/international/PersonalStatementPage';
import TrentLanguageHubPage from './pages/TrentLanguageHubPage';
import IELTSPage from './pages/IELTSPage';
import AdminPage from './pages/admin/AdminPage';
import GenericPage from './pages/GenericPage';
import CookieConsent from './components/CookieConsent';
import ChatWidget from './components/ChatWidget/ChatWidget';

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
          <Route path="/international" element={<InternationalPage />} />
          <Route path="/application-process" element={<ApplicationProcessPage />} />
          <Route path="/fees-and-funding" element={<FeesFundingPage />} />
          <Route path="/student-support" element={<StudentSupportPage />} />
          <Route path="/offer-checklist" element={<OfferChecklistPage />} />
          <Route path="/pre-arrival" element={<PreArrivalPage />} />
          <Route path="/post-arrival" element={<PostArrivalPage />} />
          <Route path="/things-to-do-nottingham" element={<ThingsToDoPage />} />
          <Route path="/eat-out-nottingham" element={<EatOutPage />} />
          <Route path="/personal-statement" element={<PersonalStatementPage />} />
          <Route path="/trent-language-hub" element={<TrentLanguageHubPage />} />
          <Route path="/ielts-exam-preparation" element={<IELTSPage />} />
          <Route path="/new-starter-form" element={<NewStarterFormPage />} />
          <Route path="/partnerships-form" element={<PartnershipsFormPage />} />
          <Route path="/application-form" element={<ApplicationFormPage />} />
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
      <ChatWidget />
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
