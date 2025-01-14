export default function NotFoundPage() {
  return (
    <>
      <div className="min-w-28 sm:w-96 bg-gray-400 h-96 mx-auto my-5 rounded-xl flex flex-col justify-center items-center gap-5">
          <h1 className="text-6xl md:text-8xl font-bold text-red-600 ">404</h1>
        <div>
          <p className="text-xl italic">Page not found</p>
        </div>
      </div>
    </>
  );
}
