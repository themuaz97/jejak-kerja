import prisma from "../db/prisma.js"

// TODO: fix the array of objects to be returned
export const getFaqCategoriesAdmin = async (req, res) => {
  try {
    const { page = 1 } = req.query;

    const pageNumber = parseInt(page, 10);
    
    const data = await prisma.faq_categories.findMany({
      orderBy: {
        created_at: "desc",
      },
    })

    const totalCount = await prisma.faq_categories.count()

    res.status(200).send({
      data,
      meta: {
        page: pageNumber,
        totalCount,
      }
    })
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
}

export const getFaqCategories = async (req, res) => {
  try {
    const data = await prisma.faq_categories.findMany({
      where: { is_active: true },
    })

    res.status(200).send({ data })
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
}

export const addFaqCategory = async (req, res) => {
  try {
    const { categoryName } = req.body

    if (!categoryName) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    const data = await prisma.faq_categories.create({
      data: {
        category_name: categoryName,
        created_by: req.user.user_id,
      },
    })

    res.status(201).send({ message: "Category added successfully", data })
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
}

export const editFaqCategory = async (req, res) => {
  try {
    const { id } = req.params
    const { categoryName } = req.body

    if (!categoryName) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    const data = await prisma.faq_categories.update({
      where: { id: Number(id) },
      data: {
        category_name: categoryName,
        updated_by: req.user.user_id,
        updated_at: new Date(),
      },
    })

    res.status(200).send({ message: "Category updated successfully", data })
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
}

export const deleteFaqCategory = async (req, res) => {
  try {
    const { id } = req.params

    const data = await prisma.faq_categories.update({
      where: { id: Number(id) },
      data: {
        is_active: false,
        updated_by: req.user.user_id,
        updated_at: new Date(),
      },
    })

    res.status(200).send({ message: "Category deleted successfully", data })
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
}

export const activateFaqCategory = async (req, res) => {
  try {
    const { id } = req.params

    const data = await prisma.faq_categories.update({
      where: { id: Number(id) },
      data: {
        is_active: true,
        updated_by: req.user.user_id,
        updated_at: new Date(),
      },
    })

    res.status(200).send({ message: "Category deleted successfully", data })
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
}

export const getFaqQuestionsAdmin = async (req, res) => {
  try {
    const { page = 1 } = req.query;

    const pageNumber = parseInt(page, 10);

    const data = await prisma.faq_questions.findMany({
      include: {
        faq_answers: true,
      },
      orderBy: {
        created_at: "desc",
      },
    })

    const totalCount = await prisma.faq_questions.count()

    res.status(200).send({
      data,
      meta: {
        page: pageNumber,
        totalCount,
      }
    })
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
}

export const getFaqQuestions = async (req, res) => {
  try {
    const data = await prisma.faq_questions.findMany({
      where: { is_active: true },
      include: {
        faq_answers: true,
      }
    })

    res.status(200).send({ data })
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
}

export const addFaqQuestion = async (req, res) => {
  try {
    const { question, faqCategoryId } = req.body

    if (!question || !faqCategoryId) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    const data = await prisma.faq_questions.create({
      data: {
        question,
        faq_category_id: Number(faqCategoryId),
        created_by: req.user.user_id,
      },
    })

    res.status(201).send({ message: "Question added successfully", data })
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
}

export const editFaqQuestion = async (req, res) => {
  try {
    const { id } = req.params
    const { question, faqCategoryId } = req.body

    if (!question || !faqCategoryId) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    const data = await prisma.faq_questions.update({
      where: { id: Number(id) },
      data: {
        question,
        faq_category_id: Number(faqCategoryId),
        updated_by: req.user.user_id,
        updated_at: new Date(),
      },
    })

    res.status(200).send({ message: "Question updated successfully", data })
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
}

export const deleteFaqQuestion = async (req, res) => {
  try {
    const { id } = req.params

    const data = await prisma.faq_questions.update({
      where: { id: Number(id) },
      data: {
        is_active: false,
        updated_by: req.user.user_id,
        updated_at: new Date(),
      },
    })

    res.status(200).send({ message: "Question deleted successfully", data })
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
}

export const activateFaqQuestion = async (req, res) => {
  try {
    const { id } = req.params

    const data = await prisma.faq_questions.update({
      where: { id: Number(id) },
      data: {
        is_active: true,
        updated_by: req.user.user_id,
        updated_at: new Date(),
      },
    })

    res.status(200).send({ message: "Question deleted successfully", data })
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
}

export const getFaqAnswersAdmin = async (req, res) => {
  try {
    const { page = 1 } = req.query;

    const pageNumber = parseInt(page, 10);

    const data = await prisma.faq_answers.findMany({
      include: {
        faq_questions: true
      },
      orderBy: {
        created_at: "desc",
      },
    })

    const totalCount = await prisma.faq_answers.count()

    res.status(200).send({
      data,
      meta: {
        page: pageNumber,
        totalCount,
      }
    })
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
}

export const getFaqAnswers = async (req, res) => {
  try {
    const data = await prisma.faq_answers.findMany({
      where: { is_active: true },
      include: {
        faq_questions: true
      }
    })

    res.status(200).send({ data })
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
}

export const addFaqAnswer = async (req, res) => {
  try {
    const { answer, faqQuestionId } = req.body

    if (!answer || !faqQuestionId) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    const data = await prisma.faq_answers.create({
      data: {
        answer,
        faq_question_id: Number(faqQuestionId),
        created_by: req.user.user_id,
      },
    })

    res.status(201).send({ message: "Answer added successfully", data })
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
}

export const editFaqAnswer = async (req, res) => {
  try {
    const { id } = req.params
    const { answer, faqQuestionId } = req.body

    if (!answer || !faqQuestionId) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    const data = await prisma.faq_answers.update({
      where: { id: Number(id) },
      data: {
        answer,
        faq_question_id: Number(faqQuestionId),
        updated_by: req.user.user_id,
        updated_at: new Date(),
      }
    })

    res.status(200).send({ message: "Answer updated successfully", data })
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
}

export const deleteFaqAnswer = async (req, res) => {
  try {
    const { id } = req.params

    const data = await prisma.faq_answers.update({
      where: { id: Number(id) },
      data: {
        is_active: false,
        updated_by: req.user.user_id,
        updated_at: new Date(),
      },
    })

    res.status(200).send({ message: "Answer deleted successfully", data })
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
}

export const activateFaqAnswer = async (req, res) => {
  try {
    const { id } = req.params

    const data = await prisma.faq_answers.update({
      where: { id: Number(id) },
      data: {
        is_active: true,
        updated_by: req.user.user_id,
        updated_at: new Date(),
      },
    })

    res.status(200).send({ message: "Answer deleted successfully", data })
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
}