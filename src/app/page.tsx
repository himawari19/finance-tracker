import LoginForm from "@/components/LoginForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2">Pencatat Keuangan</h1>
        <p className="text-center text-gray-600 mb-8">Kelola keuangan Anda dengan mudah</p>
        <LoginForm />
        <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm text-gray-700">
          <p className="font-semibold mb-2">Demo Akun:</p>
          <p>Username: <span className="font-mono">wahyu</span> | Password: <span className="font-mono">wahyu123</span></p>
          <p>Username: <span className="font-mono">nurma</span> | Password: <span className="font-mono">nurma123</span></p>
        </div>
      </div>
    </main>
  );
}
