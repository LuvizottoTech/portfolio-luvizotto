package com.felipeluvizotto.portfolio.presentation.experience

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
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Chip
import androidx.compose.material3.ChipDefaults
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
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import com.felipeluvizotto.portfolio.R
import kotlinx.coroutines.delay

data class Experience(
    val companyName: String,
    val position: String,
    val period: String,
    val description: String,
    val technologies: List<String>,
    val isPresent: Boolean = false
)

@Composable
fun ExperienceScreen() {
    var isVisible by remember { mutableStateOf(false) }

    LaunchedEffect(key1 = true) {
        isVisible = true
    }

    val experienceList = remember {
        listOf(
            Experience(
                companyName = "Tech Solutions Inc.",
                position = "Tech Lead",
                period = "2023 - Presente",
                description = "Liderança de equipe de desenvolvimento em projetos de grande porte, utilizando arquitetura de microserviços e práticas DevOps. Implementação de CI/CD e garantia de qualidade de código.",
                technologies = listOf("Java", "Spring Boot", "Kubernetes", "AWS", "React"),
                isPresent = true
            ),
            Experience(
                companyName = "Software Systems LTDA",
                position = "Desenvolvedor Senior",
                period = "2020 - 2023",
                description = "Desenvolvimento de aplicações escaláveis para o setor financeiro. Migração de sistemas legados para arquiteturas modernas. Mentoria de desenvolvedores júnior.",
                technologies = listOf("Java", "Spring", "Angular", "PostgreSQL", "Docker")
            ),
            Experience(
                companyName = "Digital Innovations",
                position = "Desenvolvedor Full Stack",
                period = "2018 - 2020",
                description = "Criação de soluções web completas para e-commerce. Implementação de integrações com gateways de pagamento e sistemas logísticos.",
                technologies = listOf("JavaScript", "Node.js", "React", "MongoDB", "GraphQL")
            ),
            Experience(
                companyName = "StartupTech",
                position = "Desenvolvedor Web",
                period = "2016 - 2018",
                description = "Desenvolvimento frontend de aplicações web responsivas. Colaboração com designers UX/UI para implementação de interfaces modernas.",
                technologies = listOf("HTML5", "CSS3", "JavaScript", "jQuery", "Bootstrap")
            )
        )
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        AnimatedVisibility(
            visible = isVisible,
            enter = fadeIn() + slideInVertically(initialOffsetY = { it / 2 })
        ) {
            Text(
                text = stringResource(id = R.string.my_experience),
                style = MaterialTheme.typography.headlineMedium,
                color = MaterialTheme.colorScheme.primary,
                modifier = Modifier.padding(bottom = 16.dp)
            )
        }

        Spacer(modifier = Modifier.height(8.dp))

        Column(
            modifier = Modifier
                .fillMaxWidth()
                .verticalScroll(rememberScrollState())
        ) {
            experienceList.forEachIndexed { index, experience ->
                var experienceVisible by remember { mutableStateOf(false) }
                LaunchedEffect(key1 = isVisible) {
                    delay(150L * (index + 1))
                    experienceVisible = true
                }

                AnimatedVisibility(
                    visible = experienceVisible,
                    enter = fadeIn() + slideInVertically(initialOffsetY = { it / 3 })
                ) {
                    ExperienceItem(
                        experience = experience,
                        isLast = index == experienceList.size - 1
                    )
                }
            }

            // Add spacer at the bottom for better scrolling experience
            Spacer(modifier = Modifier.height(72.dp))
        }
    }
}

@Composable
fun ExperienceItem(experience: Experience, isLast: Boolean) {
    Row(modifier = Modifier.fillMaxWidth()) {
        // Timeline column
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            modifier = Modifier.padding(end = 16.dp)
        ) {
            // Circle indicator
            Box(
                modifier = Modifier
                    .size(20.dp)
                    .clip(CircleShape)
                    .background(
                        if (experience.isPresent) MaterialTheme.colorScheme.primary
                        else MaterialTheme.colorScheme.secondary
                    )
            )

            // Connecting line
            if (!isLast) {
                Box(
                    modifier = Modifier
                        .width(2.dp)
                        .height(170.dp) // Adjust height as needed
                        .background(MaterialTheme.colorScheme.outline.copy(alpha = 0.5f))
                )
            }
        }

        // Content column
        Column(modifier = Modifier.weight(1f)) {
            Card(
                colors = CardDefaults.cardColors(
                    containerColor = MaterialTheme.colorScheme.surface
                ),
                elevation = CardDefaults.cardElevation(
                    defaultElevation = 2.dp
                ),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    // Company and position
                    Text(
                        text = experience.companyName,
                        style = MaterialTheme.typography.titleLarge,
                        color = MaterialTheme.colorScheme.onSurface
                    )

                    Text(
                        text = experience.position,
                        style = MaterialTheme.typography.titleMedium,
                        color = MaterialTheme.colorScheme.primary
                    )

                    // Period
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        modifier = Modifier.padding(vertical = 8.dp)
                    ) {
                        Text(
                            text = experience.period,
                            style = MaterialTheme.typography.bodyMedium,
                            color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.7f)
                        )

                        if (experience.isPresent) {
                            Chip(
                                onClick = { },
                                colors = ChipDefaults.chipColors(
                                    containerColor = MaterialTheme.colorScheme.primaryContainer,
                                    labelColor = MaterialTheme.colorScheme.onPrimaryContainer
                                ),
                                modifier = Modifier.padding(start = 8.dp)
                            ) {
                                Text(stringResource(id = R.string.present))
                            }
                        }
                    }

                    // Description
                    Text(
                        text = experience.description,
                        style = MaterialTheme.typography.bodyMedium,
                        modifier = Modifier.padding(vertical = 8.dp)
                    )

                    // Technologies
                    Text(
                        text = "Tecnologias:",
                        style = MaterialTheme.typography.labelLarge,
                        modifier = Modifier.padding(top = 8.dp, bottom = 4.dp)
                    )

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        experience.technologies.forEach { tech ->
                            TechChip(tech)
                        }
                    }
                }
            }

            Spacer(modifier = Modifier.height(16.dp))
        }
    }
}

@Composable
fun TechChip(name: String) {
    Chip(
        onClick = { },
        colors = ChipDefaults.chipColors(
            containerColor = MaterialTheme.colorScheme.tertiaryContainer,
            labelColor = MaterialTheme.colorScheme.onTertiaryContainer
        )
    ) {
        Text(text = name)
    }
}
