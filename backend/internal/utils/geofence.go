package utils

func IsPointInsidePolygon(lat, lon float64, polygon [][]float64) bool {

	inside := false
	j := len(polygon) - 1

	for i := 0; i < len(polygon); i++ {

		xi := polygon[i][1]
		yi := polygon[i][0]

		xj := polygon[j][1]
		yj := polygon[j][0]

		intersect :=
			((yi > lat) != (yj > lat)) &&
				(lon < (xj-xi)*(lat-yi)/(yj-yi)+xi)

		if intersect {
			inside = !inside
		}

		j = i
	}

	return inside
}
