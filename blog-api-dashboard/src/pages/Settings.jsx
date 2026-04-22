function Settings () {
    return(
        <section className="bg-slate-50 px-5">
            <h1 className="text-3xl font-bold py-5">Parametres</h1>
            <p className="text-gray-600 mb-10">Configurez votre application</p>
            

            <div className="bg-white shadow-md rounded-md px-4 py-4 mt-10 mb-5">
                <h1 className="text-xl mb-4 font-semibold">Apparence</h1>
                <div>
                    <div className="flex items-center gap-2">
                        <input type="radio" name="theme" />
                        <label htmlFor="theme">Theme clair</label>
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="radio" name="theme"/>
                        <label htmlFor="theme">Theme sombre</label>
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="radio" name="theme" />
                        <label htmlFor="theme">Detecter automatiquement</label>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Settings