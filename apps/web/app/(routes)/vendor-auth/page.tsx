import AuthForm from '@/components/auth/AuthForm';

export default function VendorSignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EAF4FF] px-4">
      <div className="max-w-md w-full bg-white p-6 rounded-2xl shadow">
        <AuthForm mode="sign-in" userType="vendor" />
      </div>
    </div>
  );
}
