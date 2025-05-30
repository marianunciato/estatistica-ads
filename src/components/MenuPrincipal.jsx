import React from "react";

const MenuPrincipal = React.memo(({ onSelecionar }) => {
	const botoes = [
		{ id: "discretos-nao-agrupados", label: "Dados Discretos (Não Agrupados)" },
		{ id: "discretos-agrupados", label: "Dados Discretos (Agrupados)" },
		{ id: "continuos", label: "Dados Contínuos" },
	];

	return (
		<div className="max-w-md mx-auto space-y-4">
			{botoes.map((botao) => (
				<button
					key={botao.id}
					onClick={() => onSelecionar(botao.id)}
					className="w-full py-3 px-4 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition"
				>
					{botao.label}
				</button>
			))}
			<button
				onClick={() => window.location.reload()}
				className="w-full py-3 px-4 bg-red-500 text-white rounded-xl shadow-md hover:bg-red-600 transition"
			>
				Sair
			</button>
		</div>
	);
});

export default MenuPrincipal;