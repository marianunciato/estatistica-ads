import React, { useState } from "react";

export default function Continuos({ onVoltar }) {
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

  const validarEntradas = () => {
    if (classes.length !== quantidade) {
      alert("Você precisa preencher todas as classes.");
      return false;
    }

    for (const [i, c] of classes.entries()) {
      if (
        isNaN(c.inferior) ||
        isNaN(c.superior) ||
        isNaN(c.frequencia) ||
        c.frequencia <= 0 ||
        c.superior <= c.inferior
      ) {
        alert(`Classe ${i + 1} está inválida. Verifique os limites e a frequência.`);
        return false;
      }
    }

    return true;
  };

  const calcular = () => {
    if (!validarEntradas()) return;

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
            if (qtd > 100) {
              alert("O máximo permitido é 100 classes.");
              return;
            }
            setQuantidade(qtd);
            setClasses(Array(qtd).fill({ inferior: "", superior: "", frequencia: "" }));
            setResultados(null);
          }}
          min="1"
          max="100"
        />
      </label>

      {classes.length > 0 && (
  <div className="w-full overflow-auto">
    <table className="w-full table-auto border-collapse">
      <thead>
        <tr className="bg-gray-200 text-left">
          <th className="p-2 border">Limite Inferior</th>
          <th className="p-2 border">Limite Superior</th>
          <th className="p-2 border">Frequência</th>
        </tr>
      </thead>
      <tbody>
        {classes.map((classe, i) => (
          <tr key={i}>
            <td className="p-1 border">
              <input
                type="number"
                placeholder={`Inferior ${i + 1}`}
                className="w-full p-2 border rounded"
                onChange={(e) => handleChange(i, "inferior", e.target.value)}
              />
            </td>
            <td className="p-1 border">
              <input
                type="number"
                placeholder={`Superior ${i + 1}`}
                className="w-full p-2 border rounded"
                onChange={(e) => handleChange(i, "superior", e.target.value)}
              />
            </td>
            <td className="p-1 border">
              <input
                type="number"
                placeholder={`Frequência ${i + 1}`}
                className="w-full p-2 border rounded"
                onChange={(e) => handleChange(i, "frequencia", e.target.value)}
                min="1"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
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
}