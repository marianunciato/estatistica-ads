import React, { useState } from "react";
import MenuPrincipal from "./components/MenuPrincipal";
import DiscretosNaoAgrupados from "./components/DiscretosNaoAgrupados";
import DiscretosAgrupados from "./components/DiscretosAgrupados";
import Continuos from "./components/Continuos";

const App = React.memo(() => {
	const [tela, setTela] = useState("menu");

	const renderizarTela = () => {
		switch (tela) {
			case "discretos-nao-agrupados":
				return <DiscretosNaoAgrupados onVoltar={() => setTela("menu")} />;
			case "discretos-agrupados":
				return <DiscretosAgrupados onVoltar={() => setTela("menu")} />;
			case "continuos":
				return <Continuos onVoltar={() => setTela("menu")} />
			default:
				return <MenuPrincipal onSelecionar={setTela} />;
		}
	};
	return (
		<div className="min-h-screen text-black bg-gray-100 p-4">
			<h1 className="text-3xl font-bold text-center mb-6">Estatística Aplicada</h1>
			{renderizarTela()}
		</div>
	);
})

export default App;