import React, { useState } from "react";

const Continuos = React.memo(({ onVoltar }) => {
    const [quantidade, setQuantidade] = useState(0);
    const [classes, setClasses] = useState([]);
    const [resultados, setResultados] = useState(null);

    const handleChange = (index, campo, valor) => {
        const novas = [...classes];
        novas[index] = {
            ...novas[index],
            [campo]: parseFloat(valor),
        };
        setClasses(novas);
    };

    const calcular = () => {
        const n = classes.reduce((acc, c) => acc + c.frequencia, 0);
        let acumulada = 0;

        const comMediaClasse = classes.map((c) => ({
            ...c,
            media: (c.inferior + c.superior) / 2,
        }));

        const tabela = comMediaClasse.map((c) => {
            acumulada += c.frequencia;
            return { ...c, acumulada };
        });

        const mediaGeral =
            tabela.reduce((acc, c) => acc + c.media * c.frequencia, 0) / n;

        const variancia =
            tabela.reduce(
                (acc, c) => acc + c.frequencia * Math.pow(c.media - mediaGeral, 2),
                0
            ) / n;
        const desvioPadrao = Math.sqrt(variancia);

        const metade = n / 2;
        const classeMediana = tabela.find((c) => c.acumulada >= metade);
        const i = tabela.indexOf(classeMediana);
        const F = i > 0 ? tabela[i - 1].acumulada : 0;
        const h = classeMediana.superior - classeMediana.inferior;
        const mediana =
            classeMediana.inferior +
            ((metade - F) / classeMediana.frequencia) * h;

        setResultados({ tabela, mediaGeral, variancia, desvioPadrao, mediana });
    };

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6 space-y-4">
            <h2 className="text-2xl font-semibold text-center">Dados Contínuos</h2>

            <label className="block font-medium">
                Quantidade de classes:
                <input
                    type="number"
                    className="w-full mt-1 p-2 border rounded"
                    value={quantidade}
                    onChange={(e) => {
                        const qtd = parseInt(e.target.value);
                        setQuantidade(qtd);
                        setClasses(Array(qtd).fill({ inferior: "", superior: "", frequencia: "" }));
                        setResultados(null);
                    }}
                    min="1"
                    max="100"
                />
            </label>

            {classes.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                    {classes.map((classe, i) => (
                        <div key={i} className="flex flex-col border p-2 rounded">
                            <input
                                type="number"
                                placeholder={`Limite Inferior ${i + 1}`}
                                className="p-2 border rounded mb-1"
                                onChange={(e) => handleChange(i, "inferior", e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder={`Limite Superior ${i + 1}`}
                                className="p-2 border rounded mb-1"
                                onChange={(e) => handleChange(i, "superior", e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder={`Frequência ${i + 1}`}
                                className="p-2 border rounded"
                                onChange={(e) => handleChange(i, "frequencia", e.target.value)}
                            />
                        </div>
                    ))}
                </div>
            )}

            {classes.length > 0 && (
                <button
                    onClick={calcular}
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                >
                    Calcular
                </button>
            )}

            {resultados && (
                <div className="bg-gray-100 p-4 rounded shadow">
                    <h3 className="text-lg font-semibold mb-2">Tabela de Frequência</h3>
                    <table className="w-full text-left border">
                        <thead>
                            <tr>
                                <th className="border px-2">Classe</th>
                                <th className="border px-2">Frequência</th>
                                <th className="border px-2">F. Acumulada</th>
                                <th className="border px-2">Média da Classe</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resultados.tabela.map((c, i) => (
                                <tr key={i}>
                                    <td className="border px-2">
                                        [{c.inferior} - {c.superior}]
                                    </td>
                                    <td className="border px-2">{c.frequencia}</td>
                                    <td className="border px-2">{c.acumulada}</td>
                                    <td className="border px-2">{c.media.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="mt-4">
                        <p><strong>Mediana:</strong> {resultados.mediana.toFixed(2)}</p>
                        <p><strong>Desvio Padrão:</strong> {resultados.desvioPadrao.toFixed(2)}</p>
                        <p><strong>Variância:</strong> {resultados.variancia.toFixed(2)}</p>
                    </div>
                </div>
            )}

            <button
                onClick={onVoltar}
                className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            >
                Voltar ao Menu
            </button>
        </div>
    );
})

export default Continuos;