# Sistema de Conciliação NF-e (Pedido x EAN/DUN)

Recriar fielmente o sistema do HTML enviado como app, com o mesmo visual (tema escuro "Ultramarine Flow": azul profundo + ciano laser, fontes Space Grotesk / Manrope / IBM Plex Mono) e o mesmo comportamento — tudo processado no navegador.

## Telas (menu lateral)
1. **Painel** — destaque com chamada "Concilie códigos de barra…", botões "Conciliar nota agora" e "Importar planilha", 4 indicadores (notas importadas, itens conciliados, divergências, produtos na base) e lista de notas recentes.
2. **Produtos** — tabela de todos os itens conciliados (NF, item, cód. barras NF, descrição, qtd, emb. NF, cód. interno, fornecedor, descrição catálogo, emb. cadastro, status), com busca, filtros (todos / conferidos / parcial / não localizados) e exportações (CSV, Excel conferidos, Excel não localizados).
3. **Importar planilha** — área de arrastar/soltar do Excel da base mestre; fica fixada na sessão, mostra linhas lidas e códigos indexados; botão "Atualizar planilha" e verificação automática a cada 15s no Chrome/Edge.
4. **Conciliar nota** — envio de um ou vários XMLs de NF-e, barra de progresso, botão de conciliar e limpar.
5. **Notas fiscais** — histórico das notas conciliadas (salvo no navegador), com totais de itens cadastrados e não cadastrados por nota.

## Regras de conciliação (iguais ao original)
- Códigos normalizados: apenas dígitos, sem zeros à esquerda.
- Busca cEAN e cEANTrib do XML na base:
  - ambos encontrados e mesmo produto → **conferido**; produtos diferentes → **parcial**
  - só um encontrado → **conferido**
  - nenhum, mas código do fornecedor (cProd) encontrado → **parcial**
  - nada encontrado → **não localizado**
- Trocar a planilha manualmente limpa a tabela atual, mas preserva o histórico de notas.

## Detalhes técnicos
- Rotas separadas por tela (/, /produtos, /importar, /conciliar, /notas) com layout lateral compartilhado.
- Biblioteca `xlsx` para ler/exportar Excel; DOMParser para XML.
- Estado compartilhado em um store no cliente; histórico em localStorage (como no original). Sem backend.
- Lógica de conciliação em módulo puro com testes unitários das regras acima.
- Cores como tokens no tema global.
