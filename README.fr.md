# Calculateur de patrimoine net

## Table des Matières
- [Description](#description)
- [Configuration requise](#configuration-requise)
- [Lancer l'application](#lancer-l'application)
- [Auteurs](#auteurs)

## Description

"Net Worth Calculator" est une application web développée avec React MUI. Il permet aux utilisateurs de calculer leur patrimoine net (différence entre la valeur totale de leurs actifs et la valeur totale de leurs passifs).

Les utilisateurs peuvent créer un compte ou se connecter à un compte existant et ajouter, modifier ou supprimer des entrées (actifs ou passifs).

Il existe également une page Statistiques qui permet aux utilisateurs de visualiser des statistiques concernant leurs actifs et passifs (moyenne, médiane, proportions...) ainsi qu'une page de Recherche leur permettant de rechercher des entrées spécifiques et de les trier en fonction de leur nom, valeur, catégorie et type (actif ou passif).

Cette version de l'application ne possède pas une base de données fonctionnelles. 

Cette version de l'application ne dispose pas d'une base de données fonctionnelle. À la place, json-server est utilisé, ce qui permet de simuler une base de données à l'aide d'un fichier JSON.

## System Requirements

Pour exécuter cette application, assurez-vous que votre système répond aux exigences suivantes :
- Node.js (version 18+ recommandée)
- npm (version 9+ recommandée)
- JSON Server

Notez que ce projet n'a été testé que sous Windows. Il y a aucune garantie que cette application
fonctionne sur un autre système d'exploitation.

## Running the application

### Installer les dépendances
Avant d'exécuter l'application, installez les dépendances requises :
```bash
cd frontend
npm install

cd backend
npm install
npm install json-server
```

### Exécuter le backend :
```bash
cd backend
json-server --watch db.json --port 5000
```

### Exécuter le frontend :
```bash
cd frontend
npm run dev
```

## Authors

- **Author :** Ted Herambert
