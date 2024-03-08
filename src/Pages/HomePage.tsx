import appDownloadloadImage from "../assets/appDownload.png";
import landingImage from "../assets/landing.jpeg";
const HomePage = () => {
    return (
        <div className="flex flex-col gap-12">
            <div className="bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
                <h1 className="text-5xl font-bold tracking-tight text-blue-600">
                    Start your health journey today
                </h1>
                <span className="text-xl">Doctor is just a click away!</span>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
                <img src={landingImage} />
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                    <span className="font-bold text-3xl tracking-tighter">
                        Book appointment even faster
                    </span>
                    <span>Download DOKBOOK </span>
                    <img src={appDownloadloadImage}/>
                </div>
            </div>
      </div>
  )
}

export default HomePage;