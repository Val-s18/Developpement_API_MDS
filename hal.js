/**
 * Retourne un Link Object, conforme à la spécification HAL
 * @param {*} url
 * @param {*} type
 * @param {*} name
 * @param {*} templated
 * @param {*} deprecation
 * @returns
 */
function halLinkObject(
  path,
  type = "",
  name = "",
  templated = false,
  deprecation = false
) {
  return {
    href: path,
    templated: templated,
    ...(type && { type: type }),
    ...(name && { name: name }),
    ...(deprecation && { deprecation: deprecation }),
  };
}

function mapTerrainToListResourceObject(terrains) {
  //Préparer les concerts "embarqués" comme ressource
  //par la ressource "La liste des concerts à venir"

  const embedded = terrains.map((terrain) =>
    mapTerrainToResourceObject(terrain)
  );

  //La liste des concerts à venir
  return {
    _links: {
      self: halLinkObject("/terrains"),
    },

    _embedded: {
      terrain: embedded,
    },
  };
}

/**
 * Retourne une représentation Ressource Object (HAL) d'un concert
 * @param {*} TerrainData Données brutes d'un Terrains
 * @returns un Ressource Object Terrains (spec HAL)
 */
function mapTerrainToResourceObject(TerraintData) {
  return {
    _links: {
      self: halLinkObject(`/terrain/${TerraintData.id}`), // Correction ici
      // terrain: halLinkObject("/terrain"), // Correction ici
      reservation: halLinkObject(`/terrain/${TerraintData.id}/reservations`), // Correction ici
    },
    // Données du terrain:
    description: TerraintData.description,
    date: TerraintData.date,
    totalTime: TerraintData.totalTime,
    numberOfPlayers: TerraintData.numberOfPlayers,
    status: TerraintData.status,
  };
}

module.exports = {
  halLinkObject,
  mapTerrainToResourceObject,
  mapTerrainToListResourceObject,
};
