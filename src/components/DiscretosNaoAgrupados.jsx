import React, { useState } from "react";

export default function DiscretosNaoAgrupados({ onVoltar }) {
  const [quantidade, setQuantidade] = useState(0);
  const [valores, setValores] = useState([]);
  const [resultados, setResultados] = useState(null);

  const handleInputChange = (index, valor) => {
    const novosValores = [...valores];
    novosValores[index] = parseFloat(valor);
    setValores(novosValores);
  };

  const validarEntradas = () => {
    if (valores.length !== quantidade) {
      alert("Você precisa preencher todos os valores.");
      return false;
    }

    for (const [i, v] of valores.entries()) {
      if (isNaN(v)) {
        alert(`O valor ${i + 1} não é válido. Digite apenas números.`);
        return false;
      }
    }

    return true;
  };

  const calcularResultados = () => {
    if (!validarEntradas()) return;
  
    const dados = [...valores].sort((a, b) => a - b);
    const n = dados.length;
  
    const mediana =
      n % 2 === 0
        ? (dados[n / 2 - 1] + dados[n / 2]) / 2
        : dados[Math.floor(n / 2)];
  
    const media = dados.reduce((acc, val) => acc + val, 0) / n;
  
    const variancia = dados.reduce((acc, val) => acc + Math.pow(val - media, 2), 0) / (n - 1);
    const desvioPadrao = Math.sqrt(variancia);
  
    setResultados({ mediana, desvioPadrao });
  };  

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-6 space-y-4">
      <h2 className="text-2xl font-semibold text-center">Dados Discretos (Não Agrupados)</h2>

      <label className="block font-medium">
        Quantidade de valores:
        <input
          type="number"
          className="w-full mt-1 p-2 border rounded"
          value={quantidade}
          onChange={(e) => {
            const qtd = parseInt(e.target.value);
            if (qtd > 100) {
              alert("Você pode inserir no máximo 100 valores.");
              return;
            }
            setQuantidade(qtd);
            setValores(Array(qtd).fill(""));
            setResultados(null);
          }}
          min="1"
          max="100"
        />
      </label>

      {valores.length > 0 && (
        <div className="grid grid-cols-2 gap-2">
          {valores.map((val, i) => (
            <input
              key={i}
              type="number"
              className="p-2 border rounded"
              placeholder={`Valor ${i + 1}`}
              onChange={(e) => handleInputChange(i, e.target.value)}
              min="-99999"
              max="99999"
            />
          ))}
        </div>
      )}

      {valores.length > 0 && (
        <button
          onClick={calcularResultados}
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
