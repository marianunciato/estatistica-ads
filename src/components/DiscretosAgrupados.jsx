import React, { useState } from "react";

export default function DiscretosAgrupados({ onVoltar }) {
  const [quantidade, setQuantidade] = useState(0);
  const [dados, setDados] = useState([]);
  const [resultados, setResultados] = useState(null);

  const handleChange = (index, campo, valor) => {
    const novos = [...dados];
    novos[index] = {
      ...novos[index],
      [campo]: parseFloat(valor),
    };
    setDados(novos);
  };

  const validarEntradas = () => {
    if (dados.length !== quantidade) {
      alert("Você precisa preencher todos os valores e frequências.");
      return false;
    }

    for (const [i, d] of dados.entries()) {
      if (
        isNaN(d.valor) ||
        isNaN(d.frequencia) ||
        d.frequencia <= 0
      ) {
        alert(`Entrada inválida na linha ${i + 1}. Verifique se o valor é numérico e a frequência é maior que zero.`);
        return false;
      }
    }

    return true;
  };

  const calcular = () => {
    if (!validarEntradas()) return;

    const filtrados = dados.filter(d => !isNaN(d.valor) && !isNaN(d.frequencia));
    const n = filtrados.reduce((acc, d) => acc + d.frequencia, 0);

    const ordenados = [...filtrados].sort((a, b) => a.valor - b.valor);

    let acumulada = 0;
    const dist = ordenados.map((d) => {
      acumulada += d.frequencia;
      return { ...d, acumulada };
    });

    const metade = n / 2;
    const classeMediana = dist.find(d => d.acumulada >= metade);
    const mediana = classeMediana.valor;

    const media = filtrados.reduce((acc, d) => acc + d.valor * d.frequencia, 0) / n;

    const variancia =
      filtrados.reduce((acc, d) => acc + d.frequencia * Math.pow(d.valor - media, 2), 0) / n;
    const desvioPadrao = Math.sqrt(variancia);

    setResultados({ mediana, desvioPadrao });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-6 space-y-4">
      <h2 className="text-2xl font-semibold text-center">Dados Discretos (Agrupados)</h2>

      <label className="block font-medium">
        Quantidade de valores distintos:
        <input
          type="number"
          className="w-full mt-1 p-2 border rounded"
          value={quantidade}
          onChange={(e) => {
            const qtd = parseInt(e.target.value);
            if (qtd > 100) {
              alert("O máximo permitido é 100 valores.");
              return;
            }
            setQuantidade(qtd);
            setDados(Array(qtd).fill({ valor: "", frequencia: "" }));
            setResultados(null);
          }}
          min="1"
          max="100"
        />
      </label>

      {dados.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {dados.map((item, i) => (
            <div key={i} className="flex flex-col">
              <input
                type="number"
                placeholder={`Valor ${i + 1}`}
                className="p-2 border rounded"
                onChange={(e) => handleChange(i, "valor", e.target.value)}
              />
              <input
                type="number"
                placeholder={`Frequência ${i + 1}`}
                className="p-2 border rounded mt-1"
                onChange={(e) => handleChange(i, "frequencia", e.target.value)}
                min="1"
              />
            </div>
          ))}
        </div>
      )}

      {dados.length > 0 && (
        <button
          onClick={calcular}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Calcular
        </button>
      )}

      {resultados && (
        <div className="bg-gray-100 p-4 rounded shadow">
          <p><strong>Mediana:</strong> {resultados.mediana.toFixed(2)}</p>
          <p><strong>Desvio Padrão:</strong> {resultados.desvioPadrao.toFixed(2)}</p>
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