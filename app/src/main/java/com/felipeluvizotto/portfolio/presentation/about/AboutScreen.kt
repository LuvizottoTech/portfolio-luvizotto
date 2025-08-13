package com.felipeluvizotto.portfolio.presentation.about

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.fadeIn
import androidx.compose.animation.slideInVertically
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.BusinessCenter
import androidx.compose.material.icons.filled.Code
import androidx.compose.material.icons.filled.Groups
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.felipeluvizotto.portfolio.R
import kotlinx.coroutines.delay

@Composable
fun AboutScreen() {
    var visibleState by remember { mutableStateOf(false) }

    LaunchedEffect(key1 = true) {
        visibleState = true
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(16.dp)
    ) {
        AnimatedVisibility(
            visible = visibleState,
            enter = fadeIn() + slideInVertically(initialOffsetY = { it / 2 })
        ) {
            Text(
                text = stringResource(id = R.string.about_me),
                style = MaterialTheme.typography.headlineMedium,
                color = MaterialTheme.colorScheme.primary
            )
        }

        Spacer(modifier = Modifier.height(24.dp))

        // Stats cards
        StatsSection(visibleState)

        Spacer(modifier = Modifier.height(24.dp))

        // About description
        var descriptionVisible by remember { mutableStateOf(false) }
        LaunchedEffect(key1 = visibleState) {
            delay(300)
            descriptionVisible = true
        }

        AnimatedVisibility(
            visible = descriptionVisible,
            enter = fadeIn() + slideInVertically(initialOffsetY = { it / 3 })
        ) {
            Text(
                text = stringResource(id = R.string.about_description),
                style = MaterialTheme.typography.bodyLarge,
                modifier = Modifier.padding(bottom = 24.dp)
            )
        }

        // Specialties
        var specialtiesVisible by remember { mutableStateOf(false) }
        LaunchedEffect(key1 = descriptionVisible) {
            delay(300)
            specialtiesVisible = true
        }

        AnimatedVisibility(
            visible = specialtiesVisible,
            enter = fadeIn() + slideInVertically(initialOffsetY = { it / 3 })
        ) {
            Column {
                Text(
                    text = "Especialidades",
                    style = MaterialTheme.typography.titleLarge,
                    modifier = Modifier.padding(bottom = 16.dp)
                )

                SpecialtyCard(
                    title = "Desenvolvimento Full Stack",
                    description = "Experiência completa no ciclo de desenvolvimento, do backend ao frontend.",
                    icon = Icons.Default.Code
                )

                Spacer(modifier = Modifier.height(12.dp))

                SpecialtyCard(
                    title = "Arquitetura de Software",
                    description = "Design de sistemas escaláveis utilizando padrões modernos e boas práticas.",
                    icon = Icons.Default.BusinessCenter
                )

                Spacer(modifier = Modifier.height(12.dp))

                SpecialtyCard(
                    title = "Liderança Técnica",
                    description = "Gestão de equipes de desenvolvimento com foco em qualidade e entregas.",
                    icon = Icons.Default.Groups
                )
            }
        }

        // Quote
        var quoteVisible by remember { mutableStateOf(false) }
        LaunchedEffect(key1 = specialtiesVisible) {
            delay(300)
            quoteVisible = true
        }

        Spacer(modifier = Modifier.height(32.dp))

        AnimatedVisibility(
            visible = quoteVisible,
            enter = fadeIn() + slideInVertically(initialOffsetY = { it / 3 })
        ) {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(
                        color = MaterialTheme.colorScheme.primaryContainer,
                        shape = RoundedCornerShape(8.dp)
                    )
                    .padding(16.dp)
            ) {
                Text(
                    text = ""A tecnologia é apenas uma ferramenta. O que importa é como a utilizamos para criar soluções que realmente façam a diferença."",
                    style = MaterialTheme.typography.bodyLarge.copy(
                        fontStyle = FontStyle.Italic,
                        fontWeight = FontWeight.Medium
                    ),
                    color = MaterialTheme.colorScheme.onPrimaryContainer
                )
            }
        }

        Spacer(modifier = Modifier.height(24.dp))
    }
}

@Composable
fun StatsSection(visibleState: Boolean) {
    var statsVisible by remember { mutableStateOf(false) }

    LaunchedEffect(key1 = visibleState) {
        delay(150)
        statsVisible = true
    }

    AnimatedVisibility(
        visible = statsVisible,
        enter = fadeIn() + slideInVertically(initialOffsetY = { it / 3 })
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            StatCard(
                value = "7+",
                label = "Anos de Experiência",
                modifier = Modifier.weight(1f)
            )

            Spacer(modifier = Modifier.size(8.dp))

            StatCard(
                value = "50+",
                label = "Projetos Concluídos",
                modifier = Modifier.weight(1f)
            )

            Spacer(modifier = Modifier.size(8.dp))

            StatCard(
                value = "10+",
                label = "Empresas",
                modifier = Modifier.weight(1f)
            )
        }
    }
}

@Composable
fun StatCard(value: String, label: String, modifier: Modifier = Modifier) {
    Card(
        modifier = modifier,
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.secondaryContainer
        )
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(
                text = value,
                style = MaterialTheme.typography.headlineMedium,
                color = MaterialTheme.colorScheme.onSecondaryContainer
            )

            Text(
                text = label,
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSecondaryContainer.copy(alpha = 0.7f)
            )
        }
    }
}

@Composable
fun SpecialtyCard(title: String, description: String, icon: androidx.compose.ui.graphics.vector.ImageVector) {
    Card(
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.surface
        ),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(
                imageVector = icon,
                contentDescription = title,
                tint = MaterialTheme.colorScheme.primary,
                modifier = Modifier.size(36.dp)
            )

            Column(
                modifier = Modifier
                    .weight(1f)
                    .padding(start = 16.dp)
            ) {
                Text(
                    text = title,
                    style = MaterialTheme.typography.titleMedium,
                    color = MaterialTheme.colorScheme.onSurface
                )

                Text(
                    text = description,
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.7f)
                )
            }
        }
    }
}
